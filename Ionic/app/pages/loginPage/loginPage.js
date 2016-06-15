import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Page1} from '../page1/page1';


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
    this.nextPage = Page1;
  }

  login(){
    this.nav.setRoot(Page1);
  }
}
