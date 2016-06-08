import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';


@Component({
  templateUrl: 'build/pages/page1/page1.html'
})
export class Page1 {
  static get parameters() {
    return [[NavController], [NavParams]];
  }

  constructor(nav, navParams) {
    this.nav = nav;

    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

  }
}
