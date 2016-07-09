import 'es6-shim';
import {Component} from '@angular/core';
import {ionicBootstrap, Platform, App, MenuController} from 'ionic-angular';
import {ViewChild} from '@angular/core';
import {Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {Page1} from './pages/page1/page1';
import {Page3} from './pages/page3/page3';
import {LoginPage} from './pages/loginPage/loginPage';
import {ProfilePage} from './pages/profilePage/profilePage';
import {ContactsPage} from './pages/contactsPage/contactsPage';

import {ContactsService} from './services/contactsService';


@Component({
  templateUrl: 'build/app.html',
  queries: {
    nav: new ViewChild('content')
  }
})
export class MyApp {

  //this gets injected into constructor below, it's the order that matters
  static get parameters() {
    return [[App], [Platform], [MenuController]];
  }

  constructor(app, platform, menu) {
    this.app = app;
    this.platform = platform;
    this.menu = menu;
    this.initializeApp();

    // set our app's pages (they appear in menu)
    this.primaryPages = [
        { title: 'My Profile', component: ProfilePage, icon: 'person' },
        { title: 'My Contacts', component: ContactsPage, icon: 'people' }
    ];

    this.settingsPages = [
        { title: 'Settings', component: Page1, icon: 'settings' },
        { title: 'Send Feedback', component: Page3, icon: 'send'}
    ];

    this.rootPage = LoginPage;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    //let nav = this.app.getComponent('nav');
    this.nav.setRoot(page.component);
  }
}

//https://github.com/driftyco/ionic/blob/2.0/CHANGELOG.md#steps-to-upgrade-to-beta-8
ionicBootstrap(MyApp, [ContactsService], {

}); // http://ionicframework.com/docs/v2/api/config/Config/);
