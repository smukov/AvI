import {Component} from '@angular/core';
import {ViewChild} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import {ChatPage} from '../chatPage/chatPage';

import {UserInfoService} from '../../services/userInfo.service';
import {MathService} from '../../services/math.service';

@Component({
  selector: 'page-contact',
  templateUrl: 'contactPage.html'
})
export class ContactPage {
  @ViewChild('header') header:any;
  public contact:any;

  constructor(public nav: NavController, public navParams:NavParams,
    public userInfoService: UserInfoService,
    public mathService: MathService) {
    this.contact = this.navParams.get('contact');
  }

  public openChat(){
    this.nav.push(ChatPage, {contactName: "Dr. Gregory House"});
  }

  public calculateDistance(contact){
    let contactLat = contact.locationLat;
    let contactLon = contact.locationLon;
    let userLat = this.userInfoService.getUserInfo(UserInfoService.PREF_USER_LOCATION_LAT);
    let userLon = this.userInfoService.getUserInfo(UserInfoService.PREF_USER_LOCATION_LON);

    return this.mathService.getDistanceFromLatLonInKm(contactLat, contactLon, userLat, userLon);
  }
}
