import {Component} from '@angular/core';
import {ProfileHeader} from '../components/profileHeader';
import {ContactsService} from '../../services/contacts.service';


@Component({
  templateUrl: 'build/pages/discoverUsersPage/discoverUsersPage.html',
  directives: [ProfileHeader]
})
export class DiscoverUsersPage {

  static get parameters() {
    return [[ContactsService]];
  }

  constructor(contactsService) {
    this.contactsService = contactsService;

    this.users = this.contactsService.getNearbyUsers();
  }
}
