export class ContactModel {

    public firstName:string;
    public lastName:string;
    public employment:string;
    public education:string;
    public knowledgeableIn:string;
    public interests:string;
    public currentGoals:string;
    public profileImage:string;

    constructor(firstName, lastName, employment, education){

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
}
