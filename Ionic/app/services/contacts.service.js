import {Injectable} from '@angular/core';

import {ContactModel} from '../models/contactModel';

@Injectable()
export class ContactsService {
  constructor(){
    this.contacts = [];

    let cnt = new ContactModel('#1 Gregory', 'House', 'Head of Diagnostic @ PPT Hospital', 'Attended Hopkins University 1979-1984');
    cnt.profileImage = 'build/img/hugh.png'
    let cnt2 = new ContactModel('#2 Hugh', 'Laurie', 'Actor, Writer, Director, Author, etc.', 'Attended Selwyn College, Cambridge 1978 - 1984');
    cnt2.profileImage = 'build/img/hugh.png'
    let cnt3 = new ContactModel('#3 Gregory', 'House', 'Head of Diagnostic @ PPT Hospital', 'Attended Hopkins University 1979-1984');
    cnt3.profileImage = 'build/img/hugh.png'
    let cnt4 = new ContactModel('#4 Hugh', 'Laurie', 'Actor, Writer, Director, Author, etc.', 'Attended Selwyn College, Cambridge 1978 - 1984');
    cnt4.profileImage = 'build/img/hugh.png'

    this.contacts.push(cnt);
    this.contacts.push(cnt2);
    this.contacts.push(cnt3);
    this.contacts.push(cnt4);
  }

  removeContact(cnt){
    let index = this.contacts.indexOf(cnt);
    if (index > -1) {
      this.contacts.splice(index, 1);
    }
  }

  getContacts(){
    return [...this.contacts];
  }

  getNearbyUsers(){
    return [...this.contacts];
  }
}
