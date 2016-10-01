import {Component, ViewChild} from '@angular/core';
import{
  Input,
  trigger,
  state,
  style,
  transition,
  animate} from '@angular/core';
import {ContactsService} from '../../services/contacts.service';


@Component({
  selector: 'page-discover-users',
  templateUrl: 'discoverUsersPage.html',
  animations: [
    trigger('fabState',[
      state('inactive', style({
        transform: 'scale(0)'
      })),
      state('active',   style({
        transform: 'scale(1)'
      })),
      transition('inactive <=> active', animate('150ms ease-out'))
    ])
  ]
})
export class DiscoverUsersPage {
  @ViewChild('slider') slider:any;
  public sliderOptions:any;
  public users:any[];
  public itemToDelete:number;
  public btnState:string;

  constructor(public contactsService: ContactsService) {
    this.sliderOptions = {
      nested: true,
      watchSlidesProgress: true,
      loop: false
    };

    this.users = this.contactsService.getNearbyUsers();
    this.itemToDelete = -1;

    this.btnState = 'active';
  }

  public onBtnDismissClicked(){
    let currentIndex = this.slider.getActiveIndex();
    //TODO: update db
    this._slideAndRemove(currentIndex)
  }

  public onBtnAcceptClicked(){
    let currentIndex = this.slider.getActiveIndex();
    //TODO: update db
    this._slideAndRemove(currentIndex)
  }

  public onSlideChanged(){
    console.log("onSlideChanged");
    let pendingDeletePosition = this.itemToDelete;
    if(pendingDeletePosition !== -1){
      this.itemToDelete = -1;
      this.users.splice(pendingDeletePosition, 1);
      //slider's slider is a swiper
      this.slider.slider.removeSlide(pendingDeletePosition);
      this.slider.slider.update();
    }

    if(this.slider.length() === 1 || this.slider.getActiveIndex() + 1 === this.slider.length()){
      console.log('inactive');
      this.btnState= 'inactive';
    }else{
      console.log('active');
      this.btnState= 'active';
    }
  }

  public _slideAndRemove(currentIndex){
    //don't remove the last "No More Users Nearby" slide
    if(this.slider.length() === 1 || currentIndex + 1 === this.slider.length())
      return;

    this.itemToDelete = currentIndex;
    this.slider.slideTo(currentIndex+1, 500);
  }
}
