import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ContactModel} from '../../models/contactModel';
import {ContactsService} from '../../services/contacts.service';
import {UserInfoService} from '../../services/userInfo.service';
import {ContactPage} from '../contactPage/contactPage';

declare var firebase: any;

@Component({
  selector : 'page-contacts',
  templateUrl: 'contactsPage.html'
})
export class ContactsPage {
  public contacts:Array<ContactModel>;

  constructor(public nav:NavController,
    public contactsService:ContactsService,
    public userInfoService: UserInfoService) {
    this.contacts = new Array<ContactModel>();//this.contactsService.getContacts();
    this._setFirebaseListeners(this.userInfoService.getUserInfo(UserInfoService.PREF_USER_AUTH_ID));
  }

  public contactSelected(cnt){
    this.nav.push(ContactPage, {contact: cnt});
  }

  private _setFirebaseListeners(userId : String){
    let thisRef = this;
    firebase.database().ref('/connections/' + userId).on('value', function(snapshot){
      let connections = new Map<String, String>();

      if(snapshot.hasChildren() === false){
        console.log('no connections found');
        thisRef._loadContacts(new Array<ContactModel>());
      }else{
        console.log('connections found');
        snapshot.forEach(function(childSnapshot) {
          connections.set(childSnapshot.key, childSnapshot.val());
        });

        //now get the information about connected users
        firebase.database().ref('/users/').once('value').then(function(snapshot){
          let contacts = new Array<ContactModel>();

          //get the users that are existing connections
          snapshot.forEach(function(childSnapshot) {
            if(connections.has(childSnapshot.key)
              && connections.get(childSnapshot.key) === ContactModel.CONNECTION_ACCEPTED){
              contacts.push(ContactModel.fromFirebaseObject(childSnapshot.val()));
            }
          });

          thisRef._loadContacts(contacts);
        });
      }
    });
  }

  private _loadContacts(contacts : Array<ContactModel>){
    this.contacts = contacts;
  }
}
