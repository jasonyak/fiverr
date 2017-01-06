import {UserProfile} from "./UserProfile";
import {Payment} from "./Payment";
export class UserProfileWithDetailsResponse {
    userProfile : UserProfile;
    email : String;
    phoneNumber : String;
    payments : Payment[];

    constructor(userProfile : UserProfile, email : String, phoneNumber : String, payments : Payment[]) {
        this.userProfile = userProfile;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.payments = payments;
    }
}
