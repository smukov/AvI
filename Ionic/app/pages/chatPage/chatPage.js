import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import {ChatBubble} from '../components/chatBubble/chatBubble';
import {ElasticTextarea} from '../components/elasticTextarea';

@Component({
  templateUrl: 'build/pages/chatPage/chatPage.html',
  directives: [ChatBubble, ElasticTextarea]
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
        img: 'build/img/hugh.png',
        position: 'left',
        content: 'Hello from the other side.',
        senderName: 'Gregory',
        time: '28-Jun-2016 21:53'
      },
      {
        img: 'build/img/hugh.png',
        position: 'right',
        content: 'Hi! How are?',
        senderName: 'Me',
        time: '28-Jun-2016 21:55'
      },
      {
        img: 'build/img/hugh.png',
        position: 'left',
        content: "This is some really long test that I'm writing here. Let's see how it wraps.",
        senderName: 'Gregory',
        time: '28-Jun-2016 21:57'
      }
    ];
  }

}
