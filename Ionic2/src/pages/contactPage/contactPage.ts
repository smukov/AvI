import {Component} from '@angular/core';
import {ViewChild} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import {ChatPage} from '../chatPage/chatPage';


@Component({
  selector: 'page-contact',
  templateUrl: 'contactPage.html'
})
export class ContactPage {
  @ViewChild('header') header:any;
  public contact:any;

  constructor(public nav: NavController, public navParams:NavParams) {
    this.contact = this.navParams.get('contact');

    // this.employment = 'Head of Diagnostic @ PPT Hospital';
    // this.education = 'Attended Hopkins University 1979-1984';
    // this.interests = 'Chemistry,  Piano , Guitar, Android, Economy, Football';
    // this.knowledgeable = 'Classical Music,  Fitness, Movie Trivia, HTML5, Android, JavaScript';
    // this.currentGoals = 'Learn Ionic2, Find a team for basketball';
  }

  public ionViewWillEnter(){
    //this.header.setFullName("Dr. Gregory House");
  }

  public openChat(){
    this.nav.push(ChatPage, {contactName: "Dr. Gregory House"});
  }
}
