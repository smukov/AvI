import {Component} from '@angular/core';
import {Page1} from '../page1/page1';


@Component({
  templateUrl: 'build/pages/loginPage/loginPage.html',
})
export class LoginPage {
  constructor() {
    this.nextPage = Page1;
  }

  login(){

  }
}
