import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ProfilePage} from '../profilePage/profilePage';
import {ContactPage} from '../contactPage/contactPage';


@Component({
  templateUrl: 'build/pages/loginPage/loginPage.html'
})
export class LoginPage {
  //this gets injected into constructor below, it's the order that matters
  static get parameters() {
    return [[NavController]];
  }

  constructor(nav) {
    this.nav = nav;
    this.nextPage = ProfilePage;
  }

  login(){
    //TODO just for testing
    this.nav.setRoot(ContactPage);//ProfilePage);
  }
}
