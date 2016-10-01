import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';


@Component({
  selector: 'page-one',
  templateUrl: 'page1.html'
})
export class Page1 {
  public selectedItem:any;

  constructor(public nav: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
  }
}
