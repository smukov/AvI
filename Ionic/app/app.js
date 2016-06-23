import 'es6-shim';
import {Component} from '@angular/core';
import {ionicBootstrap, Platform, App, MenuController} from 'ionic-angular';
import {ViewChild} from '@angular/core';
import {Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {Page1} from './pages/page1/page1';
import {Page2} from './pages/page2/page2';
import {Page3} from './pages/page3/page3';
import {LoginPage} from './pages/loginPage/loginPage';
import {ProfilePage} from './pages/profilePage/profilePage';
import {ContactPage} from './pages/contactPage/contactPage';


@Component({
  //template: '<ion-nav [root]="rootPage"></ion-nav>',
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
    this.pages = [
        { title: 'My Profile', component: ProfilePage },
        { title: 'Contact', component: ContactPage },
        { title: 'Page 1', component: Page1 },
        { title: 'Page 2', component: Page2 },
        { title: 'Page 3', component: Page3 }
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
ionicBootstrap(MyApp, [], {

}); // http://ionicframework.com/docs/v2/api/config/Config/);
