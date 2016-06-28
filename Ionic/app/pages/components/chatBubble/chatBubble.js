import {Component} from '@angular/core';

@Component({
  selector: 'chat-bubble',
  inputs: ['msg: message'],
  template:
  `
  <div class="chat-bubble {{msg.position}}">
    <div class="message">{{msg.content}}</div>
    <div class="message-detail">
        <span style="font-weight:bold;">{{msg.senderName}} </span>,
        <span>{{msg.time}}</span>
    </div>
  </div>
  `
})
export class ChatBubble {
  constructor() {
    this.msg = {
      content :  'Am I dreaming?',
      position : 'left',
      time : '12/3/2016',
      senderName : 'Gregory'
    }
  }
}
