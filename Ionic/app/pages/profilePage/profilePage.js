import {Component} from '@angular/core';
import {ProfileHeader} from '../components/profileHeader';
import {ViewChild} from '@angular/core';


@Component({
  templateUrl: 'build/pages/profilePage/profilePage.html',
  directives: [ProfileHeader],
  queries: {
    header: new ViewChild('header')
  }
})
export class ProfilePage {
  constructor() {

  }

  ionViewWillEnter(){
    this.header.setFullName("Dr. Gregory House");
  }
}
