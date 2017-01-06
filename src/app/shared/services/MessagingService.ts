import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions, RequestMethod, URLSearchParams } from '@angular/http';
import {CookieService} from 'angular2-cookie/core';
import 'rxjs/add/operator/toPromise';

import {Credientials} from './../models/Credientials';
import {AuthToken} from './../models/AuthToken';
import {UserProfile} from './../models/UserProfile';
import {InvalidParameterException} from '../models/InvalidParameterException';
import {environment} from './../../../environments/environment';
import {UserProfileWithDetailsResponse} from "../models/UserProfileWithDetailsResponse";
import {PaymentIdResponse} from "../models/PaymentResponse";

@Injectable()
export class MessagingService {
    private BASE_URL = environment.apiBaseUrl ;
    private AUTH_TOKEN = "AUTH_TOKEN";

    constructor(private http: Http, private cookieService: CookieService) {}

    clearCookies() : void {
        this.cookieService.remove(this.AUTH_TOKEN);
    }

    registerNewUser(email : String, password : String) : Promise<any> {
        let credientials = new Credientials(email, password);
        let url = this.BASE_URL + "/register";
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http
            .post(url, JSON.stringify(credientials), { headers: headers })
            .toPromise()
            .then((response) => {
                // Pull the json from the response and convert it to AuthToken object
                let authToken = response.json() as AuthToken;
                this.cookieService.put(this.AUTH_TOKEN, authToken.authToken);
                return Promise.resolve(authToken);
            })
            .catch((response) => {
                return Promise.reject(response);
            });
    }

    authenticateUser(email : String, password : String) : Promise<any> {
        let credientials = new Credientials(email, password);
        let url = this.BASE_URL + "/authentication";
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http
            .post(url, JSON.stringify(credientials), {headers: headers})
            .toPromise()
            .then((response) => {
                let authToken = response.json() as AuthToken;
                this.cookieService.put(this.AUTH_TOKEN, authToken.authToken);
                return Promise.resolve(authToken);
            })
            .catch((response) => {
                return Promise.reject(response);
            });
    }

    submitPhoneNumber(phoneNumber : string) : Promise<any>  {
        let url = this.BASE_URL + "/phone/create/" + phoneNumber;
        let headers = this.getAuthenticationHeader();

        return this.http
            .post(url, "", { headers: headers })
            .toPromise()
            .then()
            .catch((response) => {
                return Promise.reject(response);
                // return Promise.reject(this.getInvalidParameterException(response));
            });
    }

    requestVerificationCode() : void  {
        let url = this.BASE_URL + "/phone/verify/new";
        let headers = this.getAuthenticationHeader();

        this.http.get(url, {headers: headers}).toPromise();
    }

    submitVerificationCode(verificationCode : String) : Promise<any> {
        let url = this.BASE_URL + "/phone/verify/" + verificationCode;
        let headers = this.getAuthenticationHeader();

        return this.http
            .post(url, "", { headers: headers })
            .toPromise()
            .then()
            .catch((response) => {
                return Promise.reject(response);
            });
    }

    createUserProfile(firstname : String,
                      lastname : String,
                      birthDate : String,
                      country : String,
                      stateOrProvince : String,
                      city : String) : Promise<any> {
        let date = new Date();
        let timeZone = date.toString().split(" ")[6].replace(/[{()}]/g, '');
        let url = this.BASE_URL + "/profiles/create";
        let headers = this.getAuthenticationHeader();
        let userProfile = new UserProfile(
            firstname,
            lastname,
            timeZone,
            birthDate,
            country,
            stateOrProvince,
            city
        );

        return this.http
            .post(url, JSON.stringify(userProfile), { headers: headers })
            .toPromise()
            .then()
            .catch((response) => {
                return Promise.reject(response);
            });
    }

    readUserProfile() : Promise<any> {
        let url = this.BASE_URL + "/profiles/read";
        let headers = this.getAuthenticationHeader();

        return this.http
            .get(url, { headers: headers })
            .toPromise()
            .then((response) => {
                let userProfile = response.json() as UserProfile;
                return Promise.resolve(userProfile);
            })
            .catch((response) => {
                return Promise.reject(response);
            });
    }

    readUserProfileWithDetails() : Promise<any> {
        let url = this.BASE_URL + "/profiles/read/details";
        let headers = this.getAuthenticationHeader();

        return this.http
            .get(url, { headers: headers })
            .toPromise()
            .then((response) => {
                let userProfileWithDetails = response.json() as UserProfileWithDetailsResponse;
                return Promise.resolve(userProfileWithDetails);
            })
            .catch((response) => {
                return Promise.reject(response);
            });
    }

    createPayment() : Promise<any> {
        let url = this.BASE_URL + "/payment/new";
        let headers = this.getAuthenticationHeader();

        return this.http
            .post(url, "", { headers: headers })
            .toPromise()
            .then((response) => {
                let paymentResponse = response.json() as PaymentIdResponse;
                return Promise.resolve(paymentResponse);
            })
            .catch((response) => {
                return Promise.reject(response);
            });
    }

    deleteAccount() : Promise<any> {
        let url = this.BASE_URL + "/user/delete";
        let headers = this.getAuthenticationHeader();

        return this.http
            .delete(url, { headers: headers })
            .toPromise()
            .then((response) => {
                this.clearCookies();
                return Promise.resolve(response);
            })
            .catch((response) => {
                return Promise.reject(response);
            });
    }

    isNotAuthorized(error : any) : boolean {
        if(error.status == 401 || error.status == 403) {
            return true;
        }
        return false;
    }

    isServerError(error : any) : boolean {
        if(500 <= error.status && error.status <= 511) {
            return true;
        }
        return false;
    }

    isInvalidParameterException(error : any) : boolean {
        return error.json() instanceof Array;
    }

    getInvalidParameterException(error : any) : InvalidParameterException {
        // Pull a json list of InvalidParameters and convert them into the InvalidParameterException
        let invalidParams = error.json();
        let invalidParameterException = new InvalidParameterException(invalidParams, error.status);
        return invalidParameterException;
    }

    private getAuthenticationHeader() : Headers {
        //Authorization: Bearer <token-goes-here>
        let authHeader = "Bearer " + this.cookieService.get(this.AUTH_TOKEN);
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', authHeader);
        return headers;
    }
}
