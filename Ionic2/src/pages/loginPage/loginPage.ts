import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ProfilePage} from '../profilePage/profilePage';
import {AuthService} from '../../services/auth.service';
import {UserInfoService} from '../../services/userInfo.service';


@Component({
  selector: 'page-login',
  templateUrl: 'loginPage.html',
})
export class LoginPage {
  public nextPage:any;
  public showLoginButton:boolean;

  constructor(public nav: NavController,
      public auth: AuthService,
      public userInfoService: UserInfoService) {
    this.nextPage = ProfilePage;
    this.showLoginButton = false;
  }

  public ionViewWillEnter(){
    this.showLoginButton = false;
  }

  public ionViewDidEnter(){
    //give some time for local storage to initialize
    //so that the stored token can be obtained
    setTimeout(() => {
      if(this.auth.authenticated()){

        this.nav.setRoot(ProfilePage);
      }else{
        this.showLoginButton = true;
      }
    }, 3000)

  }

  public login(){
    this.auth.login(() => {    
      this.showLoginButton = false;
      setTimeout(() => {
        this.nav.setRoot(ProfilePage)
      }, 3000)//I need this delay because otherwise the navigation occurs
              //before the InAppBrowser closes, and the content ends up under
              //the top bar.
    });
  }
}
