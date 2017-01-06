import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {MessagingService} from './../shared/services/MessagingService';
import {InvalidParameterException} from "./../shared/models/InvalidParameterException";

@Component({
    selector: 'my-signup',
    templateUrl: './signup.component.html'
})
export class SignUpComponent {
    email : String;
    password: String;
    rePassword : String;
    errorMessage : String;
    successMessage : String;
    invalidParameterException : InvalidParameterException;
    isLoading = false;

    constructor(private messagingService: MessagingService, private router: Router) {}

    registerUser() {
        this.errorMessage = null;
        this.successMessage = null;
        this.invalidParameterException = null;
        this.isLoading = false;

        if(this.password != this.rePassword) {
            this.errorMessage = "Passwords do not match.";
        } else {
            this.isLoading = true;
            this.messagingService.registerNewUser(this.email, this.password)
                .then((response) => {
                    this.isLoading = false;
                    this.successMessage = "Your account has been created!"
                    this.router.navigate(['/enterphone']);
                })
                .catch((response) => {
                    this.isLoading = false;
                    if(this.messagingService.isInvalidParameterException(response)) {
                        this.invalidParameterException = this.messagingService.getInvalidParameterException(response);
                    } else {
                        this.errorMessage = "An internal error has occurred, please try again in a few minutes."
                    }
                });

        }
    }

    isDisabled() : boolean {
        // If we are loading from service, disable the button
        return this.isLoading;
    }
}
