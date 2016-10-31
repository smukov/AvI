import {IFirebaseObject} from './IFirebaseObject';

declare var firebase: any;

export class ContactModel implements IFirebaseObject{

    public id:string;
    public firstName:string;
    public lastName:string;
    public employment:string;
    public education:string;
    public knowledgeableIn:string;
    public interests:string;
    public currentGoals:string;
    public profileImage:string;

    constructor(firstName, lastName, employment, education){

        this.id = '';
        this.firstName = firstName;
        this.lastName = lastName;
        this.employment = employment || '';
        this.education = education || '';
        this.knowledgeableIn = '';
        this.interests = '';
        this.currentGoals = '';
        this.profileImage = '';
    }

    public getFullName(){
      return this.firstName + ' ' + this.lastName;
    }

    public toFirebaseObject():Object{
      return {
        lastModifiedTime : firebase.database.ServerValue.TIMESTAMP,
        id : this.id,
        name : this.getFullName(),
        employment : this.employment,
        education : this.education,
        knowledgeableIn : this.knowledgeableIn,
        interests : this.interests,
        currentGoals : this.currentGoals,
        profileImage : this.profileImage
      }
    }
}
