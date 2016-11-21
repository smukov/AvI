import {IFirebaseObject} from './IFirebaseObject';

declare var firebase: any;

export class ContactModel implements IFirebaseObject{

    static get CONNECTION_ACCEPTED() { return 'Accepted';}
    static get CONNECTION_DECLINED() { return 'Declined';}
    static get CONNECTION_PENDING() { return 'Pending';}

    public id:string;
    public name: string;
    public employment:string;
    public education:string;
    public knowledgeableIn:string;
    public interests:string;
    public currentGoals:string;
    public profileImage:string;

    constructor(name, employment, education){

        this.id = '';
        this.name = name;
        this.employment = employment || '';
        this.education = education || '';
        this.knowledgeableIn = '';
        this.interests = '';
        this.currentGoals = '';
        this.profileImage = '';
    }

    public getFullName(){
      return this.name; //this.firstName + ' ' + this.lastName;
    }

    public toFirebaseObject():Object{
      return {
        lastModifiedTime : firebase.database.ServerValue.TIMESTAMP,
        authId : this.id,
        name : this.getFullName(),
        employment : this.employment,
        education : this.education,
        knowledgeableIn : this.knowledgeableIn,
        interests : this.interests,
        currentGoals : this.currentGoals,
        pictureUrl : this.profileImage
      }
    }

    static fromFirebaseObject(firebaseObj : any) : ContactModel {
      let retVal = new ContactModel(
        firebaseObj['name'],
        firebaseObj['employment'],
        firebaseObj['education']);

      retVal.id = firebaseObj['authId'];
      retVal.knowledgeableIn = firebaseObj['knowledgeableIn'];
      retVal.interests = firebaseObj['interests'];
      retVal.currentGoals = firebaseObj['currentGoals'];
      retVal.profileImage = firebaseObj['pictureUrl'];

      return retVal;
    }
}
