import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MessagingService} from './../shared/services/MessagingService';

@Component({
    selector: 'my-signout',
    template: '<div></div>'
})
export class SignOutComponent implements OnInit {
    constructor(private messagingService: MessagingService, private router: Router) {}

    ngOnInit() {
        this.messagingService.clearCookies();
        this.router.navigate(['/home']);
    }
}
