import {Component} from '@angular/core';
import {PreferencesService} from '../../services/preferences.service';


@Component({
  templateUrl: 'build/pages/settingsPage/settingsPage.html'
})
export class SettingsPage {
  static get parameters() {
    return [[PreferencesService]];
  }

  constructor(preferencesService) {
    this.preferencesService = preferencesService;
    this.preferences = {};

    this.PREF_DISCOVERABLE = PreferencesService.PREF_DISCOVERABLE;
    this.PREF_NOTIFY_MESSAGES = PreferencesService.PREF_NOTIFY_MESSAGES;
    this.PREF_NOTIFY_INVITES = PreferencesService.PREF_NOTIFY_INVITES;
  }

  ionViewWillEnter(){
    this.preferences[PreferencesService.PREF_DISCOVERABLE]
      = this.preferencesService.getPreference(PreferencesService.PREF_DISCOVERABLE);
    this.preferences[PreferencesService.PREF_NOTIFY_MESSAGES]
      = this.preferencesService.getPreference(PreferencesService.PREF_NOTIFY_MESSAGES);
    this.preferences[PreferencesService.PREF_NOTIFY_INVITES]
      = this.preferencesService.getPreference(PreferencesService.PREF_NOTIFY_INVITES);
  }

  changePreference(event, key){
    this.preferencesService.setPreference(key, event.checked);
  }
}
