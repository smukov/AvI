import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import {ChatBubble} from '../components/chatBubble/chatBubble';

@Component({
  templateUrl: 'build/pages/chatPage/chatPage.html',
  directives: [ChatBubble]
})
export class ChatPage {
  static get parameters() {
    return [[NavController], [NavParams]];
  }

  constructor(nav, navParams) {
    this.nav = nav;
    this.navParams = navParams;

    this.contactName = this.navParams.get('contactName');

    this.messages = [
      {
        position: 'left',
        content: 'Hello from the other side.',
        senderName: 'Gregory',
        time: '28-Jun-2016 21:53'
      },
      {
        position: 'right',
        content: 'Hi! How are you?',
        senderName: 'Me',
        time: '28-Jun-2016 21:55'
      }
    ];
  }

}
