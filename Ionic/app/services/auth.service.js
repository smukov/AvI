import {Storage, LocalStorage} from 'ionic-angular';
import {AuthHttp, JwtHelper, tokenNotExpired} from 'angular2-jwt';
import {Injectable, NgZone} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Secret} from '../secrets/secret';

@Injectable()
export class AuthService {

  static get parameters() {
    return [[AuthHttp], [NgZone]];
  }

  constructor(authHttp, zone) {
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

        profile.user_metadata = profile.user_metadata || {};
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
    this.zoneImpl.run(() => this.user = null);
  }
}
