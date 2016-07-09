import {Component} from '@angular/core';
import {ProfileHeader} from '../components/profileHeader';
import {ContactsService} from '../../services/contactsService';

@Component({
  templateUrl: 'build/pages/contactsPage/contactsPage.html',
  directives: [ProfileHeader]
})
export class ContactsPage {
  static get parameters() {
    return [[ContactsService]];
  }

  constructor(contactsService) {
    this.contactsService = contactsService;

    this.contacts = this.contactsService.getContacts();
  }

  contactSelected(cnt){
    
  }
}
