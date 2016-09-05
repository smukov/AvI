import {Storage, LocalStorage} from 'ionic-angular';
import {AuthHttp, JwtHelper, tokenNotExpired} from 'angular2-jwt';
import {Injectable, NgZone} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Secret} from '../secrets/secret';
import {UserInfoService} from './userInfo.service';

@Injectable()
export class AuthService {

  static get parameters() {
    return [[AuthHttp], [NgZone], [UserInfoService]];
  }

  constructor(authHttp, zone, userInfoService) {
    this.authHttp = authHttp;
    this.jwtHelper = new JwtHelper();
    this.auth0 = new Auth0({clientID: Secret.AUTH0_CLIENT_ID, domain: Secret.AUTH0_DOMAIN});
    this.lock = new Auth0Lock(Secret.AUTH0_CLIENT_ID, Secret.AUTH0_DOMAIN, {
      auth: {
        redirect: false,
        params: {
          scope: 'openid offline_access',
        }
      }
    });
    this.local = new Storage(LocalStorage);
    this.refreshSubscription = {};
    this.user = {};

    this.userInfoService = userInfoService;
    this.zoneImpl = zone;
    // Check if there is a profile saved in local storage
    this.local.get('profile').then(profile => {
      this.user = JSON.parse(profile);
    }).catch(error => {
      console.log(error);
    });

    this.lock.on('authenticated', authResult => {
      this.local.set('id_token', authResult.idToken);

      // Fetch profile information
      this.lock.getProfile(authResult.idToken, (error, profile) => {
        if (error) {
          // Handle error
          alert(error);
          return;
        }

        console.log(profile);

        profile.user_metadata = profile.user_metadata || {};

        if(this.userInfoService.getUserInfo(UserInfoService.PREF_USER_NAME == '')){
          //there is no user information stored, store the new info obtained from auth0
          this.userInfoService.setUserInfo(UserInfoService.PREF_USER_NAME, profile.name);
          this.userInfoService.setUserInfo(UserInfoService.PREF_USER_EMAIL, profile.email);
          this.userInfoService.setUserInfo(UserInfoService.PREF_USER_AUTH_ID, profile.user_id);
          this.userInfoService.setUserInfo(UserInfoService.PREF_USER_PICTURE_URL, profile.picture);
        }

        this.local.set('profile', JSON.stringify(profile));
        this.user = profile;
      });

      this.lock.hide();

      this.local.set('refresh_token', authResult.refreshToken);
      this.zoneImpl.run(() => this.user = authResult.profile);
    });

  }

  authenticated() {
    // Check if there's an unexpired JWT
    return tokenNotExpired();
  }

  login() {
    // Show the Auth0 Lock widget
    this.lock.show();
  }

  logout() {
    this.local.remove('profile');
    this.local.remove('id_token');
    this.local.remove('refresh_token');
    this.userInfoService.setUserInfo(UserInfoService.PREF_USER_NAME, '');
    this.userInfoService.setUserInfo(UserInfoService.PREF_USER_EMAIL, '');
    this.userInfoService.setUserInfo(UserInfoService.PREF_USER_AUTH_ID, '');
    this.userInfoService.setUserInfo(UserInfoService.PREF_USER_PICTURE_URL, '');
    this.zoneImpl.run(() => this.user = null);
    // Unschedule the token refresh
    this.unscheduleRefresh();
  }

  scheduleRefresh() {
    // If the user is authenticated, use the token stream
    // provided by angular2-jwt and flatMap the token
    let source = this.authHttp.tokenStream.flatMap(
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

startupTokenRefresh() {
  // If the user is authenticated, use the token stream
  // provided by angular2-jwt and flatMap the token
  if (this.authenticated()) {
    let source = this.authHttp.tokenStream.flatMap(
      token => {
        // Get the expiry time to generate
        // a delay in milliseconds
        let now = new Date().valueOf();
        let jwtExp = this.jwtHelper.decodeToken(token).exp;
        let exp = new Date(0);
        exp.setUTCSeconds(jwtExp);
        let delay = exp.valueOf() - now;

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

unscheduleRefresh() {
  // Unsubscribe fromt the refresh
  if (this.refreshSubscription) {
    this.refreshSubscription.unsubscribe();
  }
}

getNewJwt() {
  // Get a new JWT from Auth0 using the refresh token saved
  // in local storage
  this.local.get('refresh_token').then(token => {
    this.auth0.refreshToken(token, (err, delegationRequest) => {
      if (err) {
        alert(err);
      }
      this.local.set('id_token', delegationRequest.id_token);
    });
  }).catch(error => {
    console.log(error);
  });
 }
}
