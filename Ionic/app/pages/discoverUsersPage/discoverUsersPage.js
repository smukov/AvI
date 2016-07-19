import {Component, ViewChild} from '@angular/core';
import {ProfileHeader} from '../components/profileHeader';
import {ContactsService} from '../../services/contacts.service';


@Component({
  templateUrl: 'build/pages/discoverUsersPage/discoverUsersPage.html',
  directives: [ProfileHeader],
  queries: {
    slider: new ViewChild('slider'),
    btnDismiss: new ViewChild('btnDismiss'),
    btnAccept: new ViewChild('btnAccept')
  }
})
export class DiscoverUsersPage {

  static get parameters() {
    return [[ContactsService]];
  }

  constructor(contactsService) {
    this.contactsService = contactsService;

    this.sliderOptions = {
      nested: true,
      watchSlidesProgress: true,
      loop: false
    };

    this.users = this.contactsService.getNearbyUsers();
    this.itemToDelete = -1;
  }

  onBtnDismissClicked(){
    let currentIndex = this.slider.getActiveIndex();
    //TODO: update db
    this._slideAndRemove(currentIndex)
  }

  onBtnAcceptClicked(){
    let currentIndex = this.slider.getActiveIndex();
    //TODO: update db
    this._slideAndRemove(currentIndex)
  }

  onSlideChanged(){
    console.log("onSlideChanged");
    let pendingDeletePosition = this.itemToDelete;
    if(pendingDeletePosition !== -1){
      this.itemToDelete = -1;
      this.users.splice(pendingDeletePosition, 1);
      //slider's slider is a swiper
      this.slider.slider.removeSlide(pendingDeletePosition);
      this.slider.slider.update();
    }

    let numberOfUsers = this.users.length;
    if(numberOfUsers === 1 || this.slider.getActiveIndex() + 1 === numberOfUsers){
      console.log(this.btnDismiss);
      //this.btnDismiss.hide();
      //this.btnAccept.hide();
    }
  }

  _slideAndRemove(currentIndex){
    //don't remove the last "No More Users Nearby" slide
    if(this.slider.length() === 1 || currentIndex + 1 === this.slider.length())
      return;

    this.itemToDelete = currentIndex;
    this.slider.slideTo(currentIndex+1, 500);
  }
}
