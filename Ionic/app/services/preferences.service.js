import {Storage, SqlStorage} from 'ionic-angular';
import {Injectable} from '@angular/core';
import {StorageService} from './storage.service';

@Injectable()
export class PreferencesService {
  static get parameters() {
     return [[StorageService]];
   }

  constructor(storageService) {
    this.storageService = storageService;
  }

  initializePreferences(){
    console.log('initializePreferences');
    this.storageService.storage.get('preferencesInitialized').then((result) => {
      console.log(result);
      if(result == null){
        console.log('initializePreferences with default values');
        this.storageService.storage.set('preferencesInitialized', true);
        this.storageService.storage.set('pref_discoverable', true);
        this.storageService.storage.set('pref_notification_messages', true);
        this.storageService.storage.set('pref_notification_invites', true);
      }
    });
  }


}
