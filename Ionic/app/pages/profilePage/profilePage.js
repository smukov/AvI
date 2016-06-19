import {Component} from '@angular/core';
import {ProfileHeader} from '../components/profileHeader'


@Component({
  templateUrl: 'build/pages/profilePage/profilePage.html',
  directives: [ProfileHeader]
})
export class ProfilePage {
  constructor() {

  }
}
