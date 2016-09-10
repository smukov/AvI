import {Component} from '@angular/core';
import {ProfileHeader} from '../components/profileHeader';
import {ViewChild} from '@angular/core';
import {UserInfoService} from '../../services/userInfo.service';


@Component({
  templateUrl: 'build/pages/profilePage/profilePage.html',
  directives: [ProfileHeader],
  queries: {
    header: new ViewChild('header')
  }
})
export class ProfilePage {

  static get parameters(){
    return [[UserInfoService]];
  }

  constructor(userInfo) {
    this.userInfo = userInfo;
    this.isEditMode = false;

    this.fullName = userInfo.getUserInfo(UserInfoService.PREF_USER_NAME);
    this.profileImageUrl = userInfo.getUserInfo(UserInfoService.PREF_USER_PICTURE_URL);
    this.employment = userInfo.getUserInfo(UserInfoService.PREF_USER_EMPLOYMENT);
    this.education = userInfo.getUserInfo(UserInfoService.PREF_USER_EDUCATION);
    this.interests = userInfo.getUserInfo(UserInfoService.PREF_USER_INTERESTS);
    this.knowledgeable = userInfo.getUserInfo(UserInfoService.PREF_USER_KNOWLEDGEABLE_IN);
    this.currentGoals = userInfo.getUserInfo(UserInfoService.PREF_USER_CURRENT_GOALS);
  }

  edit(){
    if(this.isEditMode){

    }else{

    }
    this.isEditMode = !this.isEditMode;
  }
}
