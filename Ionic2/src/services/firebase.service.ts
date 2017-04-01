import {Injectable} from '@angular/core';
import {StorageService} from './storage.service';
import {UserInfoService} from './userInfo.service';
import {PreferencesService} from './preferences.service';

import {ChatMessageModel} from '../models/chatMessageModel';

declare var firebase: any;

@Injectable()
export class FirebaseService {
  database: any;

  constructor(public userInfoService: UserInfoService, public preferencesService: PreferencesService){
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
      locationLon : this.userInfoService.getUserInfo(UserInfoService.PREF_USER_LOCATION_LON),
      isDiscoverable : this.preferencesService.getPreference(PreferencesService.PREF_DISCOVERABLE)
    });
  }

  public initIsDiscoverable(){
    firebase.database().ref('users/' + this.userInfoService.getUserInfo(UserInfoService.PREF_USER_AUTH_ID))
      .child('isDiscoverable')
      .set(this.preferencesService.getPreference(PreferencesService.PREF_DISCOVERABLE));
  }

  public setIsDiscoverable(isDiscoverable : boolean){
    firebase.database().ref('users/' + this.userInfoService.getUserInfo(UserInfoService.PREF_USER_AUTH_ID))
      .child('isDiscoverable')
      .set(isDiscoverable);
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

  public setUserConnection(userId : String, newConnectionId : String,
      connectionStatusCurrentUser: String, connectionStatusTargetUser: String){
    firebase.database().ref('/connections/')
      .child(userId)
      .child(newConnectionId)
      .set(connectionStatusCurrentUser);

    firebase.database().ref('/connections/')
      .child(newConnectionId)
      .child(userId)
      .set(connectionStatusTargetUser);
  }

  public addChatMessage(groupId:string, message: ChatMessageModel):ChatMessageModel{
    let pushRef = firebase.database().ref('/chat/messages/')
      .child(groupId)
      .push();

    pushRef.set(message.toFirebaseObject());

    message.id = pushRef.getKey();
    return message;
  }

  public createChatGroup(firstUserId:string, secondUserId:string):string {
    let groupName = firstUserId + secondUserId;

    firebase.database().ref('/chat/users/')
      .child(firstUserId)
      .child(secondUserId)
      .set(groupName);

    firebase.database().ref('/chat/users/')
      .child(secondUserId)
      .child(firstUserId)
      .set(groupName);

    return groupName;
  }
}
