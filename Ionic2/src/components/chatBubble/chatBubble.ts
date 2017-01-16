import {Component} from '@angular/core';

@Component({
  selector: 'chat-bubble',
  inputs: ['msg: message'],
  template:
  `
  <div class="chatBubble">
    <img class="profile-pic {{msg.isMe === true ? 'right' : 'left'}}" src="{{msg.image}}">
    <div class="chat-bubble {{msg.isMe === true ? 'right' : 'left'}}">
      <div class="message">{{msg.message}}</div>
      <div class="message-detail">
          <!--span style="font-weight:bold;">{{msg.senderName}} </span>,-->
          <span>{{msg.time}}</span>
      </div>
    </div>
  </div>
  `
})
export class ChatBubble {
  public msg:any;

  constructor() {
    this.msg = {
      content :  'Am I dreaming?',
      isMe : true,
      time : '12/3/2016',
      senderName : ''
    }
  }
}
