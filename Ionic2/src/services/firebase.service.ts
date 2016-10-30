import {Injectable} from '@angular/core';
import {StorageService} from './storage.service';
import {UserInfoService} from './userInfo.service';

declare var firebase: any;

@Injectable()
export class FirebaseService {
  database: any;

  constructor(public userInfoService: UserInfoService){
    this.database = firebase.database();
  }

  public writeSomeData(){
    firebase.database().ref('users/' + this.userInfoService.getUserInfo(UserInfoService.PREF_USER_AUTH_ID)).set({
      date: Date.now(),
      email: this.userInfoService.getUserInfo(UserInfoService.PREF_USER_EMAIL),
      profile_picture : this.userInfoService.getUserInfo(UserInfoService.PREF_USER_PICTURE_URL)
    });
  }
}
