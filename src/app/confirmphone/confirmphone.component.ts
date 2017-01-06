import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {MessagingService} from './../shared/services/MessagingService';
import {InvalidParameterException} from "./../shared/models/InvalidParameterException";

@Component({
    selector: 'my-confirm-phone',
    templateUrl: './confirmphone.component.html'
})
export class ConfirmPhoneComponent {
    verificationCode : String;
    invalidParameterException : InvalidParameterException;
    isSubmitVerificationCode = false;
    isRequestVerificationCode = false;
    errorMessage : String;

    constructor(private messagingService: MessagingService, private router: Router) {}

    submitVerificationCode() {
        this.isSubmitVerificationCode = true;
        this.errorMessage = null;
        this.messagingService.submitVerificationCode(this.verificationCode)
            .then((response) => {
                this.isSubmitVerificationCode = false;
                this.router.navigate(['/payment']);
            })
            .catch((response) => {
                this.isSubmitVerificationCode = false;
                if(this.messagingService.isServerError(response)) {
                    this.errorMessage = "An internal error has occurred, please try again in a few minutes."
                } else if(this.messagingService.isNotAuthorized(response)) {
                    this.router.navigate(['/signuporlogin']);
                } else if(this.messagingService.isInvalidParameterException(response)) {
                    this.invalidParameterException = this.messagingService.getInvalidParameterException(response);
                }
            });
    }

    requestVerificationCode() {
        this.isRequestVerificationCode = true;
        this.messagingService.requestVerificationCode();
        // delay(2000);
        this.isRequestVerificationCode = false;
    }

    isSubmitVerificationCodeDisabled() : boolean {
        return this.isSubmitVerificationCode;
    }

    isRequestVerificationCodeDisabled() : boolean {
        return this.isRequestVerificationCode;
    }

    delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
