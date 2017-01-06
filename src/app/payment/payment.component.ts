import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {MessagingService} from './../shared/services/MessagingService';
import {InvalidParameterException} from "./../shared/models/InvalidParameterException";

@Component({
    selector: 'my-enter-payment',
    templateUrl: './payment.component.html'
})
export class PaymentComponent {
    paypalSubscribeUrl = environment.paypalSubscribeUrl;
    paypalReturnUrl = environment.paypalReturnUrl;
    paypalNotifyUrl = environment.paypalNotifyUrl;
    paypalHostButtonIdSubscribeMonthly = environment.paypalHostButtonIdSubscribeMonthly;
    paypalHostButtonIdSubscribeAnnually = environment.paypalHostButtonIdSubscribeAnnually;
    paypalHostButtonIdUnSubscribeMonthly = environment.paypalHostButtonIdUnSubscribeMonthly;
    paypalHostButtonIdUnSubscribeAnnually = environment.paypalHostButtonIdUnSubscribeAnnually;
    paypalMonthyUnsubscribeUrl = this.paypalSubscribeUrl + "?cmd=_subscr-find&alias=" + this.paypalHostButtonIdUnSubscribeMonthly;
    paypalAnnuallyUnsubscribeUrl = this.paypalSubscribeUrl + "?cmd=_subscr-find&alias=" + this.paypalHostButtonIdUnSubscribeAnnually;

    isLocal = environment.local;
    invoiceNumber : String;
    errorMessage : String;
    invalidParameterException : InvalidParameterException;
    isLoading = false;
    paymentTypeMonthlySelected = false;
    paymentTypeAnnuallySelected = false;

    constructor(private messagingService: MessagingService, private router: Router) {}

    selectMonthlyPayments() {
        if(this.isLocal) {
            this.router.navigate(['/profilesetup']);
            return;
        }

        this.paymentTypeMonthlySelected = false;
        this.paymentTypeAnnuallySelected = false;
        this.errorMessage = null;
        this.invalidParameterException = null;
        this.isLoading = true;

        this.messagingService.createPayment()
            .then((response) => {
                this.isLoading = false;
                this.invoiceNumber = response.paymentId;
                this.paymentTypeMonthlySelected = true;
            })
            .catch((response) => {
                this.isLoading = false;
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

    selectAnnuallyPayments() {
        if(this.isLocal) {
            this.router.navigate(['/profilesetup']);
            return;
        }

        this.paymentTypeMonthlySelected = false;
        this.paymentTypeAnnuallySelected = false;
        this.errorMessage = null;
        this.invalidParameterException = null;
        this.isLoading = true;

        this.messagingService.createPayment()
            .then((response) => {
                this.isLoading = false;
                this.invoiceNumber = response.paymentId;
                this.paymentTypeAnnuallySelected = true;
            })
            .catch((response) => {
                this.isLoading = false;
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
