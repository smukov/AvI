import {Component, ViewChild} from '@angular/core';
import{
  Input,
  trigger,
  state,
  style,
  transition,
  animate} from '@angular/core';

import {ContactModel} from '../../models/contactModel';

import {ContactsService} from '../../services/contacts.service';
import {UserInfoService} from '../../services/userInfo.service';
import {FirebaseService} from '../../services/firebase.service';
import {MathService} from '../../services/math.service';

declare var firebase: any;

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
  public users:Array<ContactModel>;
  public itemToDelete:number;
  public btnState:string;

  private userId:string;

  constructor(public contactsService: ContactsService,
    public userInfoService: UserInfoService,
    public firebaseService: FirebaseService,
    public mathService: MathService) {
    this.sliderOptions = {
      nested: true,
      watchSlidesProgress: true,
      loop: false
    };

    this.users = new Array<ContactModel>();//this.contactsService.getNearbyUsers();
    this.itemToDelete = -1;

    this.userId = this.userInfoService.getUserInfo(UserInfoService.PREF_USER_AUTH_ID);
    this._setFirebaseListeners(this.userId);
  }

  public onBtnDismissClicked(){
    let currentIndex = this.slider.getActiveIndex();
    if(this.users[currentIndex] != null){
      this.firebaseService.setUserConnection(
        this.userId,
        this.users[currentIndex].id,
        ContactModel.CONNECTION_DECLINED
      );
      this._slideAndRemove(currentIndex)
    }
  }

  public onBtnAcceptClicked(){
    let currentIndex = this.slider.getActiveIndex();
    if(this.users[currentIndex] != null){
      this.firebaseService.setUserConnection(
        this.userId,
        this.users[currentIndex].id,
        ContactModel.CONNECTION_PENDING
      );
      this._slideAndRemove(currentIndex)
    }
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

  public calculateDistance(contact: ContactModel){
    let contactLat = contact.locationLat;
    let contactLon = contact.locationLon;
    let userLat = this.userInfoService.getUserInfo(UserInfoService.PREF_USER_LOCATION_LAT);
    let userLon = this.userInfoService.getUserInfo(UserInfoService.PREF_USER_LOCATION_LON);

    return this.mathService.getDistanceFromLatLonInKm(contactLat, contactLon, userLat, userLon);
  }

  private _slideAndRemove(currentIndex){
    //don't remove the last "No More Users Nearby" slide
    if(this.slider.length() === 1 || currentIndex + 1 === this.slider.length())
      return;

    this.itemToDelete = currentIndex;
    this.slider.slideTo(currentIndex+1, 500);
  }

  private _setFirebaseListeners(userId : String){
    let thisRef = this;
    firebase.database().ref('/connections/' + userId).once('value').then(function(snapshot){
      //console.log(snapshot.val());
      let connections = new Map<String, String>();

      if(snapshot.hasChildren()){
        console.log('existing connections found');
        snapshot.forEach(function(childSnapshot) {
          connections.set(childSnapshot.key, childSnapshot.val());
        });
      }

      thisRef._getPotentialConnections(connections);
    });
  }

  private _getPotentialConnections(connections : Map<String, String>){
    let thisRef = this;
    firebase.database().ref('/users/').once('value').then(function(snapshot){
      let contacts = new Array<ContactModel>();

      //get the users that aren't an existing connection
      snapshot.forEach(function(childSnapshot) {
        if(connections.has(childSnapshot.key) == false &&
            thisRef.userId !== childSnapshot.key){
          console.log(childSnapshot.val());
          contacts.push(ContactModel.fromFirebaseObject(childSnapshot.val()));
        }
      });

      thisRef._loadContacts(contacts);
    });
  }

  private _loadContacts(contacts : Array<ContactModel>){
    this.users = contacts;
    this.itemToDelete = -1;
    if(this.users.length === 0){
      this.btnState = 'inactive';
    }else{
      this.btnState = 'active';
    }
  }
}
