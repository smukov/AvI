import {Component} from '@angular/core';
import {ProfileHeader} from '../components/profileHeader';
import {ViewChild} from '@angular/core';


@Component({
  templateUrl: 'build/pages/contactPage/contactPage.html',
  directives: [ProfileHeader],
  queries: {
    header: new ViewChild('header')
  }
})
export class ContactPage {
  constructor() {
    this.employment = 'Head of Diagnostic @ PPT Hospital';
    this.education = 'Attended Hopkins University 1979-1984';
    this.interests = 'Chemistry,  Piano , Guitar, Android, Economy, Football';
    this.knowledgeable = 'Classical Music,  Fitness, Movie Trivia, HTML5, Android, JavaScript';
    this.currentGoals = 'Learn Ionic2, Find a team for basketball';
  }

  ionViewWillEnter(){
    this.header.setFullName("Dr. Gregory House");
  }
}
