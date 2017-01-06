import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {MessagingService} from './../shared/services/MessagingService';

@Component({
    selector: 'my-login',
    templateUrl: './login.component.html'
})
export class LoginComponent {
    isLoading = false;
    error : any;
    email : String;
    password : String;

    constructor(private messagingService: MessagingService, private router: Router) {}

    login() {
        this.isLoading = true;
        this.error = null;
        this.messagingService.authenticateUser(this.email, this.password)
            .then((response) => {
                this.isLoading = false;
                this.router.navigate(['/profile']);
            })
            .catch((response) => {
                this.isLoading = false;
                this.error = response;
            });
    }

    isLoginDisabled() {
        return this.isLoading;
    }
}
