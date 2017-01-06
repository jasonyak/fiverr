import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MessagingService} from './../shared/services/MessagingService';

@Component({
    selector: 'my-payment-return',
    templateUrl: './paymentreturn.component.html'
})
export class PaymentReturnComponent implements OnInit {

    constructor(private messagingService: MessagingService, private router: Router) {}

    ngOnInit() {

    }
}
