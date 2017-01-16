import {IFirebaseObject} from './IFirebaseObject';

declare var firebase: any;

export class ChatMessageModel implements IFirebaseObject{

  public id:string;
  public senderId:string;
  public message:string;
  public timestamp:number;

  public isMe:boolean;
  public dateTime:string;

  constructor(senderId, message, timestamp){
    this.id = '';
    this.senderId = senderId || '';
    this.message = message || '';
    this.timestamp = timestamp || 0;
    this.isMe = false;
    this.dateTime = new Date(this.timestamp).toLocaleTimeString();
  }

  public getDateTime() : string {
    return new Date(this.timestamp).toLocaleTimeString();
  }

  public toFirebaseObject():Object{
    return {
      sender : this.senderId,
      message : this.message,
      timestamp: firebase.database.ServerValue.TIMESTAMP
    }
  }

  static fromFirebaseObject(firebaseObj : any) : ChatMessageModel {
    let retVal = new ChatMessageModel(
      firebaseObj['sender'],
      firebaseObj['message'],
      firebaseObj['timestamp']);

    return retVal;
  }
}
