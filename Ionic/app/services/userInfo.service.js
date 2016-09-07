import {Storage, SqlStorage} from 'ionic-angular';
import {Injectable} from '@angular/core';
import {StorageService} from './storage.service';

@Injectable()
export class UserInfoService {

  static get PREF_INITIALIZED() { return 'pref_user_info_initialized';}
  static get PREF_USER_NAME() { return 'pref_user_name';}
  static get PREF_USER_EMAIL() { return 'pref_user_email';}
  static get PREF_USER_AUTH_ID() { return 'pref_user_auth_id';}
  static get PREF_USER_PICTURE_URL() { return 'pref_user_picture_url';}

  static get PREF_USER_EMPLOYMENT() { return 'pref_user_employment';}
  static get PREF_USER_EDUCATION() { return 'pref_user_education';}
  static get PREF_USER_KNOWLEDGEABLE_IN() { return 'pref_user_knowledgeable_in';}
  static get PREF_USER_INTERESTS() { return 'pref_user_interests';}
  static get PREF_USER_CURRENT_GOALS() { return 'pref_user_current_goals';}

  static get parameters() {
     return [[StorageService]];
   }

  constructor(storageService) {
    this._storageService = storageService;
    this._userInfo = {};

    this._keys = [
      UserInfoService.PREF_USER_NAME,
      UserInfoService.PREF_USER_EMAIL,
      UserInfoService.PREF_USER_AUTH_ID,
      UserInfoService.PREF_USER_PICTURE_URL,
      UserInfoService.PREF_USER_EMPLOYMENT,
      UserInfoService.PREF_USER_EDUCATION,
      UserInfoService.PREF_USER_KNOWLEDGEABLE_IN,
      UserInfoService.PREF_USER_INTERESTS,
      UserInfoService.PREF_USER_CURRENT_GOALS,
    ];
  }

  initialize(){
    console.log('initialize user info');
    this._storageService.storage.get(UserInfoService.PREF_INITIALIZED).then((result) => {
      if(result == null || result == false){
        console.log('initialize user info with default values');
        this._storageService.storage.set(UserInfoService.PREF_INITIALIZED, true);
        this._storageService.storage.set(UserInfoService.PREF_USER_NAME, '');
        this._storageService.storage.set(UserInfoService.PREF_USER_EMAIL, '');
        this._storageService.storage.set(UserInfoService.PREF_USER_AUTH_ID, '');
        this._storageService.storage.set(UserInfoService.PREF_USER_PICTURE_URL, '');

        this._storageService.storage.set(UserInfoService.PREF_USER_EMPLOYMENT, '');
        this._storageService.storage.set(UserInfoService.PREF_USER_EDUCATION, '');
        this._storageService.storage.set(UserInfoService.PREF_USER_KNOWLEDGEABLE_IN, '');
        this._storageService.storage.set(UserInfoService.PREF_USER_INTERESTS, '');
        this._storageService.storage.set(UserInfoService.PREF_USER_CURRENT_GOALS, '');


        //initialize in memory
        this._userInfo[UserInfoService.PREF_USER_NAME] = '';
        this._userInfo[UserInfoService.PREF_USER_EMAIL] = '';
        this._userInfo[UserInfoService.PREF_USER_AUTH_ID] = '';
        this._userInfo[UserInfoService.PREF_USER_PICTURE_URL] = '';

        this._userInfo[UserInfoService.PREF_USER_EMPLOYMENT] = '';
        this._userInfo[UserInfoService.PREF_USER_EDUCATION] = '';
        this._userInfo[UserInfoService.PREF_USER_KNOWLEDGEABLE_IN] = '';
        this._userInfo[UserInfoService.PREF_USER_INTERESTS] = '';
        this._userInfo[UserInfoService.PREF_USER_CURRENT_GOALS] = '';
      }else{
        console.log('user info obtained from storage');

        let thisRef = this;
        this._getAllUserInfo(this._keys).then(function(results){
            //initialize in memory user information
            for(let i = 0; i < thisRef._keys.length; i++){
              thisRef._userInfo[thisRef._keys[i]] = results[i];
            }
            console.log('stored user info:');
            console.log(thisRef._userInfo);
          }, function (err) {
            // If any of the information fail to read, err is the first error
            console.log(err);
          });
      }
    });
  }

  /* retrieve stored user information */
  getAllUserInfo(){
    return this._getAllUserInfo(this._keys);
  }

  getUserInfo(key){
    return this._getUserInfo(key);
  }

  setUserInfo(key, value){
    this._userInfo[key] = value;//update in memory
    this._storageService.storage.set(key, value);//update in db
  }

  _getAllUserInfo(keys){
    return Promise.all(keys.map((key) => {
      return this._storageService.storage.get(key);
    }));
  }

  _getUserInfo(key){
    return this._storageService.storage.get(key);
  }

}
