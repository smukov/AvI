export class ContactModel {

    constructor(firstName, lastName, employment, education, knowledgeableIn, interests, currentGoals){

        this.firstName = firstName;
        this.lastName = lastName;
        this.employment = employment || '';
        this.education = education || '';
        this.employment = employment || '';
        this.knowledgeableIn = knowledgeableIn || '';
        this.interests = interests || '';
        this.currentGoals = currentGoals || '';
        this.profileImage = '';
    }

    getFullName(){
      return this.firstName + ' ' + this.lastName;
    }
}
