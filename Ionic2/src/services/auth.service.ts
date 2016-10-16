import {Storage} from '@ionic/storage';
import {AuthHttp, JwtHelper, tokenNotExpired} from 'angular2-jwt';
import {Injectable, NgZone} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Secret} from '../secrets/secret';
import {UserInfoService} from './userInfo.service';

// Avoid name not found warnings
declare var Auth0: any;
declare var Auth0Lock: any;

@Injectable()
export class AuthService {
  public onAuthenticatedCallback: any = null;
  public onLogOutCallback: any = null;

  jwtHelper: JwtHelper = new JwtHelper();
  auth0 = new Auth0({clientID: Secret.AUTH0_CLIENT_ID, domain: Secret.AUTH0_DOMAIN });
  lock = new Auth0Lock(Secret.AUTH0_CLIENT_ID, Secret.AUTH0_DOMAIN, {
    auth: {
      redirect: false,
      params: {
        scope: 'openid offline_access',
      }
    }
  });
  storage: Storage = new Storage();
  refreshSubscription: any;
  user: Object;
  zoneImpl: NgZone;
  idToken: string;

  constructor(private authHttp: AuthHttp, private zone:NgZone, public userInfoService: UserInfoService) {
    this.zoneImpl = zone;
    // Check if there is a profile saved in local storage
    this.storage.get('profile').then(profile => {
      this.user = JSON.parse(profile);
    }).catch(error => {
      console.log(error);
    });

    this.storage.get('id_token').then(token => {
      this.idToken = token;
    });

    this.lock.on('authenticated', authResult => {
      this.storage.set('id_token', authResult.idToken);
      this.idToken = authResult.idToken;

      // Fetch profile information
      this.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          // Handle error
          alert(error);
          return;
        }

        console.log(profile);

        profile.user_metadata = profile.user_metadata || {};

        if(this.userInfoService.getUserInfo(UserInfoService.PREF_USER_NAME) === ''){
          //there is no user information stored, store the new info obtained from auth0
          this.userInfoService.setUserInfo(UserInfoService.PREF_USER_NAME, profile.name);
          this.userInfoService.setUserInfo(UserInfoService.PREF_USER_EMAIL, profile.email);
          this.userInfoService.setUserInfo(UserInfoService.PREF_USER_AUTH_ID, profile.user_id);
          this.userInfoService.setUserInfo(UserInfoService.PREF_USER_PICTURE_URL, profile.picture);
        }

        this.storage.set('profile', JSON.stringify(profile));
        this.user = profile;
      });

      this.lock.hide();

      this.storage.set('refresh_token', authResult.refreshToken);
      this.zoneImpl.run(() => this.user = authResult.profile);

      // Schedule a token refresh
      this.scheduleRefresh();

      if(this.onAuthenticatedCallback != null){
        this.onAuthenticatedCallback();
      }
    });

  }

  public authenticated() {
    // Check if there's an unexpired JWT
    console.log('check if token expired: ' + this.idToken);
    if(this.idToken == null){
        console.log('token is not defined');
        return false;
    }
    return tokenNotExpired('id_token', this.idToken);
  }

  public login(onAuthenticatedCallback) {
    // Show the Auth0 Lock widget
    this.lock.show();
    this.onAuthenticatedCallback = onAuthenticatedCallback;
  }

  public logout(onLogOutCallback) {
    this.onLogOutCallback = onLogOutCallback;
    this.storage.remove('profile');
    this.storage.remove('id_token');
    this.idToken = null;
    this.storage.remove('refresh_token');
    this.userInfoService.setUserInfo(UserInfoService.PREF_USER_NAME, '');
    this.userInfoService.setUserInfo(UserInfoService.PREF_USER_EMAIL, '');
    this.userInfoService.setUserInfo(UserInfoService.PREF_USER_AUTH_ID, '');
    this.userInfoService.setUserInfo(UserInfoService.PREF_USER_PICTURE_URL, '');
    this.zoneImpl.run(() => this.user = null);
    // Unschedule the token refresh
    this.unscheduleRefresh();
    if(this.onLogOutCallback != null){
      this.onLogOutCallback();
    }
  }

  public scheduleRefresh() {
    // If the user is authenticated, use the token stream
    // provided by angular2-jwt and flatMap the token
    let source = Observable.of(this.idToken).flatMap(
      token => {
        // The delay to generate in this case is the difference
        // between the expiry time and the issued at time
        let jwtIat = this.jwtHelper.decodeToken(token).iat;
        let jwtExp = this.jwtHelper.decodeToken(token).exp;
        let iat = new Date(0);
        let exp = new Date(0);

        let delay = (exp.setUTCSeconds(jwtExp) - iat.setUTCSeconds(jwtIat));

        return Observable.interval(delay);
      });

    this.refreshSubscription = source.subscribe(() => {
      this.getNewJwt();
    });
  }

public startupTokenRefresh() {
  // If the user is authenticated, use the token stream
  // provided by angular2-jwt and flatMap the token
  if (this.authenticated()) {
    let source = Observable.of(this.idToken).flatMap(
      token => {
        // Get the expiry time to generate
        // a delay in milliseconds
        let now: number = new Date().valueOf();
        let jwtExp: number = this.jwtHelper.decodeToken(token).exp;
        let exp: Date = new Date(0);
        exp.setUTCSeconds(jwtExp);
        let delay: number = exp.valueOf() - now;

        // Use the delay in a timer to
        // run the refresh at the proper time
        return Observable.timer(delay);
      });

      // Once the delay time from above is
      // reached, get a new JWT and schedule
      // additional refreshes
      source.subscribe(() => {
        this.getNewJwt();
        this.scheduleRefresh();
      });
  }
}

public unscheduleRefresh() {
  // Unsubscribe fromt the refresh
  if (this.refreshSubscription) {
    console.log(this.refreshSubscription);
    this.refreshSubscription.unsubscribe();
  }
}

public getNewJwt() {
  // Get a new JWT from Auth0 using the refresh token saved
  // in local storage
  this.storage.get('refresh_token').then(token => {
    this.auth0.refreshToken(token, (err, delegationRequest) => {
      if (err) {
        alert(err);
      }
      this.storage.set('id_token', delegationRequest.id_token);
      this.idToken = delegationRequest.id_token;
    });
  }).catch(error => {
    console.log(error);
  });
 }
}
