import {Storage} from '@ionic/storage';
import {Injectable} from '@angular/core';

@Injectable()
export class StorageService {
  public storage:Storage;

  constructor() {
    this.storage = new Storage();
  }
}
