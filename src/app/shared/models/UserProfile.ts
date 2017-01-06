export class UserProfile {
    firstname : String;
    lastname : String;
    timezone : String;
    birthDate: String;
    country : String;
    state : String;
    city : String;

    constructor(firstname : String,
                lastname : String,
                timezone : String,
                birthDate : String,
                country : String,
                state : String,
                city : String) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.timezone = timezone;
        this.birthDate = birthDate;
        this.country = country;
        this.state = state;
        this.city = city;
    }
}
