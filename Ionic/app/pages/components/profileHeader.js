import {Component} from '@angular/core';

@Component({
  selector: 'profile-header',
  template:
  `
  <div class="content-center-left">
    <img src="build/img/hugh.png" style="border-radius: 50%; width: 60px; height: 60px;">
    <span class="profile-header">{{fullName}}</span>
  </div>
  `
})
export class ProfileHeader {
  constructor() {
    this.fullName = 'Dr. House';
  }

  setFullName(fullName){
    this.fullName = fullName;
  }
}
