import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ProfilePage} from '../profilePage/profilePage';
import {AuthService} from '../../services/auth.service';
import {UserInfoService} from '../../services/userInfo.service';


@Component({
  templateUrl: 'build/pages/loginPage/loginPage.html'
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
  }

  login(){
    this.auth.login();
    //this.nav.setRoot(ProfilePage);
  }
}
