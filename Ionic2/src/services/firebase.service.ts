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

  public storeUserInfo(){
    firebase.database().ref('users/' + this.userInfoService.getUserInfo(UserInfoService.PREF_USER_AUTH_ID)).set({
      lastModifiedTime: firebase.database.ServerValue.TIMESTAMP,
      authId: this.userInfoService.getUserInfo(UserInfoService.PREF_USER_AUTH_ID),
      name : this.userInfoService.getUserInfo(UserInfoService.PREF_USER_NAME),
      email: this.userInfoService.getUserInfo(UserInfoService.PREF_USER_EMAIL),
      pictureUrl : this.userInfoService.getUserInfo(UserInfoService.PREF_USER_PICTURE_URL),
      employment : this.userInfoService.getUserInfo(UserInfoService.PREF_USER_EMPLOYMENT),
      education : this.userInfoService.getUserInfo(UserInfoService.PREF_USER_EDUCATION),
      interests : this.userInfoService.getUserInfo(UserInfoService.PREF_USER_INTERESTS),
      currentGoals : this.userInfoService.getUserInfo(UserInfoService.PREF_USER_CURRENT_GOALS),
      knowledgeableIn : this.userInfoService.getUserInfo(UserInfoService.PREF_USER_KNOWLEDGEABLE_IN),
      locationLat : this.userInfoService.getUserInfo(UserInfoService.PREF_USER_LOCATION_LAT),
      locationLon : this.userInfoService.getUserInfo(UserInfoService.PREF_USER_LOCATION_LON)
    });
  }

  public storeUserLocationFromPrefs(){
    this.storeUserLocation(
      this.userInfoService.getUserInfo(UserInfoService.PREF_USER_LOCATION_LAT),
      this.userInfoService.getUserInfo(UserInfoService.PREF_USER_LOCATION_LON));
  }

  public storeUserLocation(locationLat: Number, locationLon: Number){
    firebase.database().ref('users/' + this.userInfoService.getUserInfo(UserInfoService.PREF_USER_AUTH_ID))
      .child('locationLat')
      .set(locationLat);

    firebase.database().ref('users/' + this.userInfoService.getUserInfo(UserInfoService.PREF_USER_AUTH_ID))
      .child('locationLon')
      .set(locationLon);
  }

  public setUserConnection(userId : String, newConnectionId : String, connectionStatus: String){
    firebase.database().ref('/connections/')
      .child(userId)
      .child(newConnectionId)
      .set(connectionStatus);

    firebase.database().ref('/connections/')
      .child(newConnectionId)
      .child(userId)
      .set(connectionStatus);
  }
}
