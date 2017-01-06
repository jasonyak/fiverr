"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var Credientials_1 = require('./../models/Credientials');
var UserProfile_1 = require('./../models/UserProfile');
var InvalidParameterException_1 = require('../models/InvalidParameterException');
var environment_1 = require('./../../../environments/environment');
var MessagingService = (function () {
    function MessagingService(http, cookieService) {
        this.http = http;
        this.cookieService = cookieService;
        this.BASE_URL = environment_1.environment.apiBaseUrl;
        this.AUTH_TOKEN = "AUTH_TOKEN";
    }
    MessagingService.prototype.clearCookies = function () {
        this.cookieService.remove(this.AUTH_TOKEN);
    };
    MessagingService.prototype.registerNewUser = function (email, password) {
        var _this = this;
        var credientials = new Credientials_1.Credientials(email, password);
        var url = this.BASE_URL + "/register";
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
            .post(url, JSON.stringify(credientials), { headers: headers })
            .toPromise()
            .then(function (response) {
            // Pull the json from the response and convert it to AuthToken object
            var authToken = response.json();
            _this.cookieService.put(_this.AUTH_TOKEN, authToken.authToken);
            return Promise.resolve(authToken);
        })
            .catch(function (response) {
            return Promise.reject(response);
        });
    };
    MessagingService.prototype.authenticateUser = function (email, password) {
        var _this = this;
        var credientials = new Credientials_1.Credientials(email, password);
        var url = this.BASE_URL + "/authentication";
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
            .post(url, JSON.stringify(credientials), { headers: headers })
            .toPromise()
            .then(function (response) {
            var authToken = response.json();
            _this.cookieService.put(_this.AUTH_TOKEN, authToken.authToken);
            return Promise.resolve(authToken);
        })
            .catch(function (response) {
            return Promise.reject(response);
        });
    };
    MessagingService.prototype.submitPhoneNumber = function (phoneNumber) {
        var url = this.BASE_URL + "/phone/create/" + phoneNumber;
        var headers = this.getAuthenticationHeader();
        return this.http
            .post(url, "", { headers: headers })
            .toPromise()
            .then()
            .catch(function (response) {
            return Promise.reject(response);
            // return Promise.reject(this.getInvalidParameterException(response));
        });
    };
    MessagingService.prototype.requestVerificationCode = function () {
        var url = this.BASE_URL + "/phone/verify/new";
        var headers = this.getAuthenticationHeader();
        this.http.get(url, { headers: headers }).toPromise();
    };
    MessagingService.prototype.submitVerificationCode = function (verificationCode) {
        var url = this.BASE_URL + "/phone/verify/" + verificationCode;
        var headers = this.getAuthenticationHeader();
        return this.http
            .post(url, "", { headers: headers })
            .toPromise()
            .then()
            .catch(function (response) {
            return Promise.reject(response);
        });
    };
    MessagingService.prototype.createUserProfile = function (firstname, lastname, birthDate, country, stateOrProvince, city) {
        var date = new Date();
        var timeZone = date.toString().split(" ")[6].replace(/[{()}]/g, '');
        var url = this.BASE_URL + "/profiles/create";
        var headers = this.getAuthenticationHeader();
        var userProfile = new UserProfile_1.UserProfile(firstname, lastname, timeZone, birthDate, country, stateOrProvince, city);
        return this.http
            .post(url, JSON.stringify(userProfile), { headers: headers })
            .toPromise()
            .then()
            .catch(function (response) {
            return Promise.reject(response);
        });
    };
    MessagingService.prototype.readUserProfile = function () {
        var url = this.BASE_URL + "/profiles/read";
        var headers = this.getAuthenticationHeader();
        return this.http
            .get(url, { headers: headers })
            .toPromise()
            .then(function (response) {
            var userProfile = response.json();
            return Promise.resolve(userProfile);
        })
            .catch(function (response) {
            return Promise.reject(response);
        });
    };
    MessagingService.prototype.readUserProfileWithDetails = function () {
        var url = this.BASE_URL + "/profiles/read/details";
        var headers = this.getAuthenticationHeader();
        return this.http
            .get(url, { headers: headers })
            .toPromise()
            .then(function (response) {
            var userProfileWithDetails = response.json();
            return Promise.resolve(userProfileWithDetails);
        })
            .catch(function (response) {
            return Promise.reject(response);
        });
    };
    MessagingService.prototype.createPayment = function () {
        var url = this.BASE_URL + "/payment/new";
        var headers = this.getAuthenticationHeader();
        return this.http
            .post(url, "", { headers: headers })
            .toPromise()
            .then(function (response) {
            var paymentResponse = response.json();
            return Promise.resolve(paymentResponse);
        })
            .catch(function (response) {
            return Promise.reject(response);
        });
    };
    MessagingService.prototype.deleteAccount = function () {
        var _this = this;
        var url = this.BASE_URL + "/user/delete";
        var headers = this.getAuthenticationHeader();
        return this.http
            .delete(url, { headers: headers })
            .toPromise()
            .then(function (response) {
            _this.clearCookies();
            return Promise.resolve(response);
        })
            .catch(function (response) {
            return Promise.reject(response);
        });
    };
    MessagingService.prototype.isNotAuthorized = function (error) {
        if (error.status == 401 || error.status == 403) {
            return true;
        }
        return false;
    };
    MessagingService.prototype.isServerError = function (error) {
        if (500 <= error.status && error.status <= 511) {
            return true;
        }
        return false;
    };
    MessagingService.prototype.isInvalidParameterException = function (error) {
        return error.json() instanceof Array;
    };
    MessagingService.prototype.getInvalidParameterException = function (error) {
        // Pull a json list of InvalidParameters and convert them into the InvalidParameterException
        var invalidParams = error.json();
        var invalidParameterException = new InvalidParameterException_1.InvalidParameterException(invalidParams, error.status);
        return invalidParameterException;
    };
    MessagingService.prototype.getAuthenticationHeader = function () {
        //Authorization: Bearer <token-goes-here>
        var authHeader = "Bearer " + this.cookieService.get(this.AUTH_TOKEN);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', authHeader);
        return headers;
    };
    MessagingService = __decorate([
        core_1.Injectable()
    ], MessagingService);
    return MessagingService;
}());
exports.MessagingService = MessagingService;
//# sourceMappingURL=MessagingService.js.map