import {Storage, SqlStorage} from 'ionic-angular';
import {Injectable} from '@angular/core';
import {StorageService} from './storage.service';

@Injectable()
export class PreferencesService {

  static get PREF_INITIALIZED() { return 'preferencesInitialized';}
  static get PREF_DISCOVERABLE() { return 'pref_discoverable';}
  static get PREF_NOTIFY_MESSAGES() { return 'pref_notification_messages';}
  static get PREF_NOTIFY_INVITES() { return 'pref_notification_invites';}

  static get parameters() {
     return [[StorageService]];
   }

  constructor(storageService) {
    this._storageService = storageService;
    this._preferences = {};
  }

  initializePreferences(){
    console.log('initializePreferences');
    this._storageService.storage.get(PreferencesService.PREF_INITIALIZED).then((result) => {
      if(result == null || result == false){
        console.log('initializePreferences with default values');
        this._storageService.storage.set(PreferencesService.PREF_INITIALIZED, true);
        this._storageService.storage.set(PreferencesService.PREF_DISCOVERABLE, true);
        this._storageService.storage.set(PreferencesService.PREF_NOTIFY_MESSAGES, true);
        this._storageService.storage.set(PreferencesService.PREF_NOTIFY_INVITES, true);

        //initialize in memory preferences
        this._preferences[PreferencesService.PREF_DISCOVERABLE] = true;
        this._preferences[PreferencesService.PREF_NOTIFY_MESSAGES] = true;
        this._preferences[PreferencesService.PREF_NOTIFY_INVITES] = true;
      }else{
        console.log('preferences obtained from storage');
        let prefs =
          [
            PreferencesService.PREF_DISCOVERABLE,
            PreferencesService.PREF_NOTIFY_MESSAGES,
            PreferencesService.PREF_NOTIFY_INVITES
          ];

        let thisRef = this;
        this._getAllPreferences(prefs).then(function(results){
            //initialize in memory preferences
            for(let i = 0; i < prefs.length; i++){
              thisRef._preferences[prefs[i]] = results[i];
            }
          }, function (err) {
            // If any of the preferences fail to read, err is the first error
            console.log(err);
          });
      }
    });
  }

  getPreference(key){
    return this._preferences[key];
  }

  setPreference(key, value){
    this._preferences[key] = value;//update pref in memory
    this._storageService.storage.set(key, value);//update pref in db
  }

  _getAllPreferences(prefs){
    return Promise.all(prefs.map((key) => {
      return this._storageService.storage.get(key);
    }));
  }

  _getPreference(key){
    return this._storageService.storage.get(key);
  }
}
