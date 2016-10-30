import {Component} from '@angular/core';
import {UserInfoService} from '../../services/userInfo.service';
import {FirebaseService} from '../../services/firebase.service';


@Component({
  selector: 'page-profile',
  templateUrl: 'profilePage.html'
})
export class ProfilePage {

  public isEditMode:boolean;
  public fullName:string;
  public profileImageUrl:string;
  public employment:string;
  public education:string;
  public interests:string;
  public knowledgeable:string;
  public currentGoals:string;

  constructor(public userInfo:UserInfoService, public firebase:FirebaseService) {
    this.isEditMode = false;
  }

  public ionViewWillEnter(){
    this.fullName = this.userInfo.getUserInfo(UserInfoService.PREF_USER_NAME);
    this.profileImageUrl = this.userInfo.getUserInfo(UserInfoService.PREF_USER_PICTURE_URL);
    this.employment = this.userInfo.getUserInfo(UserInfoService.PREF_USER_EMPLOYMENT);
    this.education = this.userInfo.getUserInfo(UserInfoService.PREF_USER_EDUCATION);
    this.interests = this.userInfo.getUserInfo(UserInfoService.PREF_USER_INTERESTS);
    this.knowledgeable = this.userInfo.getUserInfo(UserInfoService.PREF_USER_KNOWLEDGEABLE_IN);
    this.currentGoals = this.userInfo.getUserInfo(UserInfoService.PREF_USER_CURRENT_GOALS);
  }

  public edit(){
    this.firebase.writeSomeData();

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
