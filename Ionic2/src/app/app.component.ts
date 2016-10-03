import { Component, ViewChild } from '@angular/core'; //TODO: provide
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import {Page1} from '../pages/page1/page1';
import {Page3} from '../pages/page3/page3';
import {LoginPage} from '../pages/loginPage/loginPage';
import {ProfilePage} from '../pages/profilePage/profilePage';
import {ContactsPage} from '../pages/contactsPage/contactsPage';
import {PendingInvitesPage} from '../pages/pendingInvitesPage/pendingInvitesPage';
import {SettingsPage} from '../pages/settingsPage/settingsPage';
import {DiscoverUsersPage} from '../pages/discoverUsersPage/discoverUsersPage';


import {ContactsService} from '../services/contacts.service';
import {StorageService} from '../services/storage.service';
import {PreferencesService} from '../services/preferences.service';
import {UserInfoService} from '../services/userInfo.service';

import {Http} from '@angular/http';
import {AuthHttp, AuthConfig} from 'angular2-jwt';
//TODO: import {AuthService} from '../services/auth.service';
import {Secret} from '../secrets/secret';

@Component({
  templateUrl: `app.html`
})
export class MyApp {
  @ViewChild('content') nav: Nav;
  public primaryPages:any[];
  public settingsPages:any[];
  public rootPage:any;

  constructor(public platform: Platform, public menu: MenuController,
    public preferencesService: PreferencesService,
    //TODO: public auth: AuthService,
    public userInfoService: UserInfoService) {

    this.initializeApp();

    // set our app's pages (they appear in menu)
    this.primaryPages = [
        { title: 'My Profile', component: ProfilePage, icon: 'person' },
        { title: 'My Contacts', component: ContactsPage, icon: 'contacts' },
        { title: 'Pending Invites', component: PendingInvitesPage, icon: 'person-add' },
        { title: 'Discover Users', component: DiscoverUsersPage, icon: 'people' }
    ];

    this.settingsPages = [
        { title: 'Settings', component: SettingsPage, icon: 'settings' }
    ];

    this.rootPage = ProfilePage;//LoginPage;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      this.userInfoService.initialize();
      this.preferencesService.initializePreferences();
      //TODO: this.auth.startupTokenRefresh();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    //let nav = this.app.getComponent('nav');
    this.nav.setRoot(page.component);
  }

  sendFeedback(){
    window.open(
      'mailto:' + Secret.FEEDBACK_EMAIL +
      '?subject=' + Secret.FEEDBACK_SUBJECT, '_system');
  }
}
