import {Component, ViewChild, NgZone} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import {ChatMessageModel} from '../../models/chatMessageModel';

import {UserInfoService} from '../../services/userInfo.service';
import {FirebaseService} from '../../services/firebase.service';

declare var firebase: any;

@Component({
  selector: 'page-chat',
  templateUrl: 'chatPage.html'
})
export class ChatPage {
  @ViewChild('txtChat') txtChat:any;
  @ViewChild('content') content:any;
  public messages:any[];
  public contact:any;
  public userId:string;
  public userName:string;
  public userPicture:string;
  public groupId:string;


  constructor(public nav: NavController,
    public navParams: NavParams,
    public userInfoService: UserInfoService,
    public firebaseService: FirebaseService,
    private _zone: NgZone) {
    this.contact = this.navParams.get('contact');

    this.messages = [];

    this.userId = this.userInfoService.getUserInfo(UserInfoService.PREF_USER_AUTH_ID);
    this.userName = this.userInfoService.getUserInfo(UserInfoService.PREF_USER_NAME);
    this.userPicture = this.userInfoService.getUserInfo(UserInfoService.PREF_USER_PICTURE_URL);
    this._setFirebaseListeners(this.userId);
  }

  // public ionViewDidEnter(){
  //     this.content.scrollToBottom(300);//300ms animation speed
  // }

  public sendMessage(){
    this.txtChat.setFocus();

    let chatMessage = new ChatMessageModel(
      this.userId,
      this.txtChat.content)

    this.firebaseService.addChatMessage(this.groupId, chatMessage);
    this.txtChat.clearInput();
  }

  private _setFirebaseListeners(userId : String){
    let thisRef = this;
    firebase.database().ref('/chat/users/' + userId).once('value', function(snapshot){

      if(snapshot.hasChildren() === true){
        console.log('an existing chat room found with this user');
        thisRef.groupId = snapshot.child(thisRef.contact.id).val();
      }else{
        console.log('no existing chat rooms found with this user');
        thisRef.groupId = thisRef.firebaseService.createChatGroup(
          thisRef.userId,
          thisRef.contact.id);
      }

      firebase.database().ref('/chat/messages/' + thisRef.groupId)
        .orderByChild('timestamp')
        .limitToLast(500)
        .on('child_added', function(childSnapshot, prevChildKey) {
          let newMessage =
            ChatMessageModel.fromFirebaseObject(childSnapshot.val());

          newMessage.isMe = thisRef.userId === newMessage.senderId;
          if(newMessage.isMe){
            newMessage.image = thisRef.userPicture;
          }else{
            newMessage.image = thisRef.contact.profileImage;
          }

          thisRef.messages.push(newMessage);

          //this will update the UI
          thisRef._zone.run(() => {
            thisRef.messages = thisRef.messages;

            //without this timeout the list scrolls
            //to the second to last element.
            //It's some kind of race condition
            setTimeout(() => {
              thisRef.content.scrollToBottom(300);//300ms animation speed
            });
          });
        });
    });
  }

}
