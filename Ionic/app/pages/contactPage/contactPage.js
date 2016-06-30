import {Component} from '@angular/core';
import {ViewChild} from '@angular/core';
import {NavController} from 'ionic-angular';

import {ProfileHeader} from '../components/profileHeader';

import {ChatPage} from '../chatPage/chatPage';


@Component({
  templateUrl: 'build/pages/contactPage/contactPage.html',
  directives: [ProfileHeader],
  queries: {
    header: new ViewChild('header')
  }
})
export class ContactPage {
  static get parameters() {
    return [[NavController]];
  }

  constructor(nav) {
    this.nav = nav;

    this.employment = 'Head of Diagnostic @ PPT Hospital';
    this.education = 'Attended Hopkins University 1979-1984';
    this.interests = 'Chemistry,  Piano , Guitar, Android, Economy, Football';
    this.knowledgeable = 'Classical Music,  Fitness, Movie Trivia, HTML5, Android, JavaScript';
    this.currentGoals = 'Learn Ionic2, Find a team for basketball';
  }

  ionViewWillEnter(){
    this.header.setFullName("Dr. Gregory House");
  }

  openChat(){
    this.nav.push(ChatPage, {contactName: "Dr. Gregory House"});
  }
}
