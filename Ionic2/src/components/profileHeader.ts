import {Component} from '@angular/core';

@Component({
  selector: 'profile-header',
  inputs: ['fullName', 'profileImage'],
  template:
  `
  <div class="content-center-left">
    <img src="{{profileImage}}" style="border-radius: 50%; width: 60px; height: 60px;">
    <span class="profile-header-name">{{fullName}}</span>
  </div>
  `
})
export class ProfileHeader {
  public fullName:string;
  public profileImage:string;

  constructor() {
    this.fullName = 'Dr. House';
    this.profileImage = 'assets/img/hugh.png';
  }
}
