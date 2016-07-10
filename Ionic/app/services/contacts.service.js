import {Injectable} from '@angular/core';

import {ContactModel} from '../models/contactModel';

@Injectable()
export class ContactsService {
  constructor(){
    this.contacts = [];

    let cnt = new ContactModel('Gregory', 'House', 'Head of Diagnostic @ PPT Hospital', 'Attended Hopkins University 1979-1984');
    cnt.profileImage = 'build/img/hugh.png'
    let cnt2 = new ContactModel('Hugh', 'Laurie', 'Actor, Writer, Director, Author, etc.', 'Attended Selwyn College, Cambridge 1978 - 1984');
    cnt2.profileImage = 'build/img/hugh.png'

    this.contacts.push(cnt);
    this.contacts.push(cnt2);
  }

  getContacts(){
    return this.contacts;
  }
}
