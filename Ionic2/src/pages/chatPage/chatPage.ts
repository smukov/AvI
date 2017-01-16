import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
  selector: 'page-chat',
  templateUrl: 'chatPage.html'
})
export class ChatPage {
  @ViewChild('txtChat') txtChat:any;
  @ViewChild('content') content:any;
  public messages:any[];
  public contact:any;


  constructor(public nav: NavController, public navParams: NavParams) {
    this.contact = this.navParams.get('contact');

    this.messages = [
      {
        img: 'assets/img/hugh.png',
        position: 'left',
        content: 'Hello from the other side.',
        senderName: 'Gregory',
        time: '28-Jun-2016 21:53'
      },
      {
        img: 'assets/img/hugh.png',
        position: 'right',
        content: 'Hi! How are?',
        senderName: 'Me',
        time: '28-Jun-2016 21:55'
      }
    ];
  }

  public ionViewDidEnter(){
      this.content.scrollToBottom(300);//300ms animation speed
  }

  public sendMessage(){
    this.txtChat.setFocus();

    this.messages.push({
      img: 'assets/img/hugh.png',
      position: 'right',
      content: this.txtChat.content,
      senderName: 'Me',
      time: new Date().toLocaleTimeString()
    });

    //console.log(this.txtChat.content);
    this.txtChat.clearInput();

    //without this timeout the list scrolls
    //to the second to last element.
    //It's some kind of race condition
    setTimeout(() => {
      this.content.scrollToBottom(300);//300ms animation speed
    });
  }

}
