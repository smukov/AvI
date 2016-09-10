import {Component, ViewChild} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ProfilePage} from '../profilePage/profilePage';
import {AuthService} from '../../services/auth.service';
import {UserInfoService} from '../../services/userInfo.service';


@Component({
  templateUrl: 'build/pages/loginPage/loginPage.html',
})
export class LoginPage {
  //this gets injected into constructor below, it's the order that matters
  static get parameters() {
    return [[NavController], [AuthService], [UserInfoService]];
  }

  constructor(nav, auth, userInfoService) {
    this.nav = nav;
    this.auth = auth;
    this.userInfoService = userInfoService;
    this.nextPage = ProfilePage;
    this.showLoginButton = false;
  }

  ionViewWillEnter(){
    this.showLoginButton = false;
  }

  ionViewDidEnter(){
    if(this.auth.authenticated()){
      //give some time for local storage to initialize
      setTimeout(() => {
        this.nav.setRoot(ProfilePage);
      }, 1000)
    }else{
      this.showLoginButton = true;
    }
  }

  login(){
    this.auth.login(() =>
      setTimeout(() => {
        this.nav.setRoot(ProfilePage)
      }, 1000)//I need this delay because otherwise the navigation occurs
              //before the InAppBrowser closes, and the content ends up under
              //the top bar.
    );
  }
}
