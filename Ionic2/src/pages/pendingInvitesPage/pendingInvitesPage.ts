import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ContactsService} from '../../services/contacts.service';
import {ContactPage} from '../contactPage/contactPage';


@Component({
  selector: 'page-pending-invites',
  templateUrl: 'pendingInvitesPage.html'
})
export class PendingInvitesPage {
  public contacts:any[];

  constructor(public nav: NavController, public contactsService:ContactsService) {
    this.contacts = this.contactsService.getContacts();
  }

  public openInvite(cnt){
    this.nav.push(ContactPage, {contact: cnt});
  }

  public dismissInvite(cnt){
    this._removeContact(cnt);
  }

  public acceptInvite(cnt){
    this._removeContact(cnt);
  }

  public _removeContact(cnt){
    let index = this.contacts.indexOf(cnt);
    if (index > -1) {
      this.contacts.splice(index, 1);
    }
  }
}
