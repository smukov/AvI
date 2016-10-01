import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ContactsService} from '../../services/contacts.service';
import {ContactPage} from '../contactPage/contactPage';


@Component({
  selector : 'page-contacts',
  templateUrl: 'contactsPage.html'
})
export class ContactsPage {
  public contacts:any[];

  constructor(public nav:NavController, public contactsService:ContactsService) {
    this.contacts = this.contactsService.getContacts();
  }

  public contactSelected(cnt){
    this.nav.push(ContactPage, {contact: cnt});
  }
}
