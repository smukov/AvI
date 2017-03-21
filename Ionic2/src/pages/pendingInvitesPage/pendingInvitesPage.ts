import {Component, NgZone} from '@angular/core';
import {NavController} from 'ionic-angular';

import {ContactModel} from '../../models/contactModel';
import {UserInfoService} from '../../services/userInfo.service';
import {FirebaseService} from '../../services/firebase.service';
import {ContactPage} from '../contactPage/contactPage';

declare var firebase: any;

@Component({
  selector: 'page-pending-invites',
  templateUrl: 'pendingInvitesPage.html'
})
export class PendingInvitesPage {

  public contacts:Array<ContactModel>;

  private userId:string;

  constructor(public nav: NavController,
    public userInfoService: UserInfoService,
    public firebaseService: FirebaseService,
    private _zone: NgZone) {

    this.contacts = new Array<ContactModel>();
    this.userId = this.userInfoService.getUserInfo(UserInfoService.PREF_USER_AUTH_ID);
    this._setFirebaseListeners(this.userId);
  }

  public openInvite(cnt){
    this.nav.push(ContactPage, {contact: cnt});
  }

  public dismissInvite(cnt){
    this.firebaseService.setUserConnection(
      this.userId,
      cnt.id,
      ContactModel.CONNECTION_DECLINED,
      ContactModel.CONNECTION_DECLINED
    );
    this._removeContact(cnt);
  }

  public acceptInvite(cnt){
    this.firebaseService.setUserConnection(
      this.userId,
      cnt.id,
      ContactModel.CONNECTION_ACCEPTED,
      ContactModel.CONNECTION_ACCEPTED
    );
    this._removeContact(cnt);
  }

  private _removeContact(cnt){
    let index = this.contacts.indexOf(cnt);
    if (index > -1) {
      this.contacts.splice(index, 1);
    }
  }

  private _setFirebaseListeners(userId : String){
    let thisRef = this;
    firebase.database().ref('/connections/' + userId).on('value', function(snapshot){
      let connections = new Map<String, String>();

      if(snapshot.hasChildren() === false){
        console.log('no pending connections found');
        thisRef._loadContacts(new Array<ContactModel>());
      }else{
        console.log('pending connections found');
        snapshot.forEach(function(childSnapshot) {
          connections.set(childSnapshot.key, childSnapshot.val());
        });

        //now get the information about pending connection users
        firebase.database().ref('/users/').once('value').then(function(snapshot){
          let contacts = new Array<ContactModel>();

          //get the users that aren't an existing connection
          snapshot.forEach(function(childSnapshot) {
            if(connections.has(childSnapshot.key)
              && connections.get(childSnapshot.key) === ContactModel.CONNECTION_INCOMING){
              contacts.push(ContactModel.fromFirebaseObject(childSnapshot.val()));
            }
          });

          thisRef._loadContacts(contacts);
        });
      }
    });
  }

  private _loadContacts(contacts : Array<ContactModel>){
    // HACK: Workaround for a bug in zone.js (0.6.12):
    // https://github.com/angular/zone.js/issues/304
    this._zone.run(() => this.contacts = contacts);
  }
}
