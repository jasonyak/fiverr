import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {MessagingService} from './../shared/services/MessagingService';

@Component({
    selector: 'my-profile-setup',
    templateUrl: './profilesetup.component.html'
})
export class ProfileSetupComponent {
    firstname : String;
    lastname : String;
    birthDate: String;
    country : String;
    stateOrProvince : String;
    city : String;

    errorMessage : String;
    isLoading = false;

    constructor(private messagingService: MessagingService, private router: Router) {}

    setupProfile() {
        this.errorMessage = null;
        this.isLoading = true;

        this.messagingService.createUserProfile(
            this.firstname,
            this.lastname,
            this.birthDate,
            this.country,
            this.stateOrProvince,
            this.city)
            .then((response) => {
                this.isLoading = false;
                this.router.navigate(['/tony']);
            })
            .catch((response) => {
                this.isLoading = false;
                if(this.messagingService.isServerError(response)) {
                    this.errorMessage = "An internal error has occurred, please try again in a few minutes."
                } else if(this.messagingService.isNotAuthorized(response)) {
                    this.router.navigate(['/signuporlogin']);
                } else if(this.messagingService.isInvalidParameterException(response)) {
                    // this.invalidParameterException = this.messagingService.getInvalidParameterException(response);
                }
            });
    }

    isDisabled() : boolean {
        return this.isLoading;
    }
}
