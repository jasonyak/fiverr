import {AuthToken} from "./AuthToken";
export class RegisterUserResult {
    authToken : AuthToken;
    
    constructor(authToken : AuthToken) {
        this.authToken = authToken;
    }
}
