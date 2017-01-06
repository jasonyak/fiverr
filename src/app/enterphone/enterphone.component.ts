import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {MessagingService} from './../shared/services/MessagingService';
import {InvalidParameterException} from "./../shared/models/InvalidParameterException";

@Component({
    selector: 'my-enter-phone',
    templateUrl: './enterphone.component.html'
})
export class EnterPhoneComponent {
    phoneNumber : String;
    invalidParameterException : InvalidParameterException;
    isLoading = false;
    errorMessage : String;

    constructor(private messagingService: MessagingService, private router: Router) {}

    submitPhoneNumber() {
        this.isLoading = true;
        this.errorMessage = null;

        let phoneNumberNoChars = this.phoneNumber.replace(/\D/g,'');
        this.messagingService.submitPhoneNumber(phoneNumberNoChars)
            .then((response) => {
                this.isLoading = false;
                this.messagingService.requestVerificationCode();
                this.router.navigate(['/confirmphone']);
            })
            .catch((response) => {
                this.isLoading = false;
                if(this.messagingService.isServerError(response)) {
                    this.errorMessage = "An internal error has occurred, please try again in a few minutes."
                } else if(this.messagingService.isNotAuthorized(response)) {
                    this.router.navigate(['/signuporlogin']);
                } else if(this.messagingService.isInvalidParameterException(response)) {
                    this.invalidParameterException = this.messagingService.getInvalidParameterException(response);
                }
            });
    }

    isDisabled() : boolean {
        return this.isLoading;
    }
}
