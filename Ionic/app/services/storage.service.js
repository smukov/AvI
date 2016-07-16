import {Storage, SqlStorage} from 'ionic-angular';
import {Injectable} from '@angular/core';

@Injectable()
export class StorageService {
  constructor() {
    this.storage = new Storage(SqlStorage);
  }
}
