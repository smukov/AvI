import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ProfileHeader} from '../components/profileHeader';
import {ContactsService} from '../../services/contacts.service';
import {ContactPage} from '../contactPage/contactPage';


@Component({
  templateUrl: 'build/pages/contactsPage/contactsPage.html',
  directives: [ProfileHeader]
})
export class ContactsPage {
  static get parameters() {
    return [[NavController], [ContactsService]];
  }

  constructor(nav, contactsService) {
    this.nav = nav;
    this.contactsService = contactsService;

    this.contacts = this.contactsService.getContacts();
  }

  contactSelected(cnt){
    this.nav.push(ContactPage, {contact: cnt});
  }
}
