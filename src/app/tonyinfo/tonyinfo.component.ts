import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MessagingService} from './../shared/services/MessagingService';
import {InvalidParameterException} from "../shared/models/InvalidParameterException";
import {environment} from '../../environments/environment';

@Component({
    selector: 'my-tony-info',
    templateUrl: './tonyinfo.component.html'
})
export class TonyInfoComponent implements OnInit {
    firstname : String;
    invalidParameterException : InvalidParameterException;
    errorMessage : String;
    isLoading = false;
    hasAccess = false;

    twilioNumber = environment.twilioPhoneNumber;

    constructor(private messagingService: MessagingService, private router: Router) {}

    ngOnInit() {
        this.isLoading = true;
        this.errorMessage = null;
        this.messagingService
            .readUserProfile()
            .then((response) => {
                this.isLoading = false;
                this.firstname = response.firstname;
                this.hasAccess = true;
            })
            .catch((response) => {
                this.isLoading = false;
                this.hasAccess = false;
                if(this.messagingService.isServerError(response)) {
                    this.errorMessage = "An internal error has occurred, please try again in a few minutes."
                } else if(this.messagingService.isNotAuthorized(response)) {
                    this.router.navigate(['/signuporlogin']);
                    this.errorMessage = "You do not have access to this page, login or sign up and try again."
                } else if(this.messagingService.isInvalidParameterException(response)) {
                    this.invalidParameterException = this.messagingService.getInvalidParameterException(response);
                }
            });
    }
}
