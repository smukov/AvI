import { NgModule, ErrorHandler  } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler  } from 'ionic-angular';
import { MyApp } from './app.component';
import { Storage } from '@ionic/storage';

//pages
import {Page1} from '../pages/page1/page1';
import {Page3} from '../pages/page3/page3';
import {LoginPage} from '../pages/loginPage/loginPage';
import {ProfilePage} from '../pages/profilePage/profilePage';
import {ContactsPage} from '../pages/contactsPage/contactsPage';
import {PendingInvitesPage} from '../pages/pendingInvitesPage/pendingInvitesPage';
import {SettingsPage} from '../pages/settingsPage/settingsPage';
import {DiscoverUsersPage} from '../pages/discoverUsersPage/discoverUsersPage';
import {ChatPage} from '../pages/chatPage/chatPage';
import {ContactPage} from '../pages/contactPage/contactPage';

//components
import {ElasticTextarea} from '../components/elasticTextarea';
import {ProfileHeader} from '../components/profileHeader';
import {ChatBubble} from '../components/chatBubble/chatBubble';

//services (providers)
import {AuthService} from '../services/auth.service';
import {ContactsService} from '../services/contacts.service';
import {PreferencesService} from '../services/preferences.service';
import {StorageService} from '../services/storage.service';
import {UserInfoService} from '../services/userInfo.service';
import {FirebaseService} from '../services/firebase.service';

//external
import {Http} from '@angular/http';
import {AuthHttp, AuthConfig} from 'angular2-jwt';

let storage: Storage = new Storage();

export function getAuthHttp(http) {
  return new AuthHttp(new AuthConfig({
    globalHeaders: [{'Accept': 'application/json'}],
    tokenGetter: (() => storage.get('id_token'))
  }), http);
}

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page3,
    LoginPage,
    ProfilePage,
    ContactsPage,
    PendingInvitesPage,
    SettingsPage,
    DiscoverUsersPage,
    ChatPage,
    ContactPage,
    ElasticTextarea,
    ProfileHeader,
    ChatBubble
  ],
  imports: [
    IonicModule.forRoot(MyApp, {})//config object here
  ],
  bootstrap: [
    IonicApp
  ],
  entryComponents: [
    MyApp,
    Page1,
    Page3,
    LoginPage,
    ProfilePage,
    ContactsPage,
    PendingInvitesPage,
    SettingsPage,
    DiscoverUsersPage,
    ChatPage,
    ContactPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ContactsService,
    PreferencesService,
    StorageService,
    UserInfoService,
    AuthService,
    {
        provide: AuthHttp,
        useFactory: getAuthHttp,
        deps:[Http]
    },
    FirebaseService
  ]
})
export class AppModule {}
