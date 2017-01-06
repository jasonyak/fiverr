import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {MessagingService} from './../shared/services/MessagingService';
import {InvalidParameterException} from "../shared/models/InvalidParameterException";
import {UserProfileWithDetailsResponse} from "../shared/models/UserProfileWithDetailsResponse";
import {Payment} from "../shared/models/Payment";
import {environment} from '../../environments/environment';
import {ModalComponent} from '../modal/modal.component';

@Component({
    selector: 'my-profile',
    templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
    paypalUnsubscribeUrl = environment.paypalSubscribeUrl + "?cmd=_subscr-find&alias=" + environment.paypalHostButtonIdUnSubscribe;

    invalidParameterException : InvalidParameterException;
    errorMessage : String;
    isLoading = false;

    userProfileWithDetails : UserProfileWithDetailsResponse;
    phoneNumber : String;
    email : String;
    firstname : String;
    lastname : String;
    country : String;
    state : String;
    city : String;
    payments : Payment[];

    @ViewChild(ModalComponent)
    public readonly modal: ModalComponent;
    enableDeleteAccountButton = false;
    invalidParameterExceptionModal : InvalidParameterException;
    errorMessageModal : String;
    isLoadingModal = false;

    constructor(private messagingService: MessagingService, private router: Router) {}

    ngOnInit() {
        this.isLoading = true;
        this.errorMessage = null;
        this.invalidParameterException = null;
        this.messagingService
            .readUserProfileWithDetails()
            .then((response) => {
                this.isLoading = false;
                this.userProfileWithDetails = response as UserProfileWithDetailsResponse;

                this.phoneNumber = this.userProfileWithDetails.phoneNumber;
                this.email = this.userProfileWithDetails.email;
                this.firstname = this.userProfileWithDetails.userProfile.firstname;
                this.lastname = this.userProfileWithDetails.userProfile.lastname;
                this.country = this.userProfileWithDetails.userProfile.country;
                this.state = this.userProfileWithDetails.userProfile.state;
                this.city = this.userProfileWithDetails.userProfile.city;
                this.payments = this.userProfileWithDetails.payments;
            })
            .catch((response) => {
                this.isLoading = false;
                if(this.messagingService.isServerError(response)) {
                    this.errorMessage = "An internal error has occurred, please try again in a few minutes."
                } else if(this.messagingService.isNotAuthorized(response)) {
                    this.router.navigate(['/signuporlogin']);
                } else if(this.messagingService.isInvalidParameterException(response)) {
                    this.invalidParameterException = this.messagingService.getInvalidParameterException(response);

                    //If any of the invalidparams is NO_PROFILE, then we redirect them to payment setup
                    let invalidParams = this.invalidParameterException.invalidParams;
                    var i;
                    for(i = 0; i < invalidParams.length; i++) {
                        let invalidParam = invalidParams[i];
                        if(invalidParam.name == "NO_PROFILE") {
                            this.router.navigate(['/payment']);
                        }
                    }
                }
            });
    }

    contactInfo() {
        this.router.navigate(['/tony']);
    }

    deleteAccount() {
        // this.modal.hide();
        this.isLoadingModal = true;
        this.errorMessageModal = null;
        this.invalidParameterExceptionModal = null;

        this.messagingService
            .deleteAccount()
            .then((response) => {
                this.isLoadingModal = false;
                this.modal.hide();
                this.router.navigate(['/home']);
            })
            .catch((response) => {
                this.isLoadingModal = false;
                if(this.messagingService.isServerError(response)) {
                    this.errorMessageModal = "An internal error has occurred, please try again in a few minutes."
                } else if(this.messagingService.isNotAuthorized(response)) {
                    this.router.navigate(['/signuporlogin']);
                } else if(this.messagingService.isInvalidParameterException(response)) {
                    this.invalidParameterExceptionModal = this.messagingService.getInvalidParameterException(response);
                }
            });
    }
}
