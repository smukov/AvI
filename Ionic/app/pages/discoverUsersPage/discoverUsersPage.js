import {Component, ViewChild} from '@angular/core';
import {ProfileHeader} from '../components/profileHeader';
import {ContactsService} from '../../services/contacts.service';


@Component({
  templateUrl: 'build/pages/discoverUsersPage/discoverUsersPage.html',
  directives: [ProfileHeader],
  queries: {
    slider: new ViewChild('slider')
  }
})
export class DiscoverUsersPage {

  static get parameters() {
    return [[ContactsService]];
  }

  constructor(contactsService) {
    this.contactsService = contactsService;

    this.sliderOptions = {
      loop: false
    };

    this.users = this.contactsService.getNearbyUsers();
  }

  onBtnDismissClicked(){
    console.log('onBtnDismissClicked');
  }

  onBtnAcceptClicked(){
    console.log('onBtnAcceptClicked');
  }

  onSlideChanged(){
    let currentIndex = this.slider.getActiveIndex();
    console.log(this.slider);
    console.log("Current index is", currentIndex);
 }
}
