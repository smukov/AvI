import {Component} from '@angular/core';
import {ProfileHeader} from '../components/profileHeader';
import {UserInfoService} from '../../services/userInfo.service';


@Component({
  templateUrl: 'build/pages/profilePage/profilePage.html',
  directives: [ProfileHeader]
})
export class ProfilePage {

  static get parameters(){
    return [[UserInfoService]];
  }

  constructor(userInfo) {
    this.userInfo = userInfo;
    this.isEditMode = false;
  }

  ionViewWillEnter(){
    this.fullName = this.userInfo.getUserInfo(UserInfoService.PREF_USER_NAME);
    this.profileImageUrl = this.userInfo.getUserInfo(UserInfoService.PREF_USER_PICTURE_URL);
    this.employment = this.userInfo.getUserInfo(UserInfoService.PREF_USER_EMPLOYMENT);
    this.education = this.userInfo.getUserInfo(UserInfoService.PREF_USER_EDUCATION);
    this.interests = this.userInfo.getUserInfo(UserInfoService.PREF_USER_INTERESTS);
    this.knowledgeable = this.userInfo.getUserInfo(UserInfoService.PREF_USER_KNOWLEDGEABLE_IN);
    this.currentGoals = this.userInfo.getUserInfo(UserInfoService.PREF_USER_CURRENT_GOALS);
  }

  edit(){
    if(this.isEditMode){
      //it was in edit mode, so save the changes
      this.userInfo.setUserInfo(UserInfoService.PREF_USER_EMPLOYMENT, this.employment);
      this.userInfo.setUserInfo(UserInfoService.PREF_USER_EDUCATION, this.education);
      this.userInfo.setUserInfo(UserInfoService.PREF_USER_INTERESTS, this.interests);
      this.userInfo.setUserInfo(UserInfoService.PREF_USER_KNOWLEDGEABLE_IN, this.knowledgeable);
      this.userInfo.setUserInfo(UserInfoService.PREF_USER_CURRENT_GOALS, this.currentGoals);
    }
    this.isEditMode = !this.isEditMode;
  }
}
