"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var environment_1 = require('../../environments/environment');
var modal_component_1 = require('../modal/modal.component');
var ProfileComponent = (function () {
    function ProfileComponent(messagingService, router) {
        this.messagingService = messagingService;
        this.router = router;
        this.paypalUnsubscribeUrl = environment_1.environment.paypalSubscribeUrl + "?cmd=_subscr-find&alias=" + environment_1.environment.paypalHostButtonIdUnSubscribe;
        this.isLoading = false;
        this.readonly = modal;
        this.enableDeleteAccountButton = false;
        this.isLoadingModal = false;
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isLoading = true;
        this.errorMessage = null;
        this.invalidParameterException = null;
        this.messagingService
            .readUserProfileWithDetails()
            .then(function (response) {
            _this.isLoading = false;
            _this.userProfileWithDetails = response;
            _this.phoneNumber = _this.userProfileWithDetails.phoneNumber;
            _this.email = _this.userProfileWithDetails.email;
            _this.firstname = _this.userProfileWithDetails.userProfile.firstname;
            _this.lastname = _this.userProfileWithDetails.userProfile.lastname;
            _this.country = _this.userProfileWithDetails.userProfile.country;
            _this.state = _this.userProfileWithDetails.userProfile.state;
            _this.city = _this.userProfileWithDetails.userProfile.city;
            _this.payments = _this.userProfileWithDetails.payments;
        })
            .catch(function (response) {
            _this.isLoading = false;
            if (_this.messagingService.isServerError(response)) {
                _this.errorMessage = "An internal error has occurred, please try again in a few minutes.";
            }
            else if (_this.messagingService.isNotAuthorized(response)) {
                _this.router.navigate(['/signuporlogin']);
            }
            else if (_this.messagingService.isInvalidParameterException(response)) {
                _this.invalidParameterException = _this.messagingService.getInvalidParameterException(response);
                //If any of the invalidparams is NO_PROFILE, then we redirect them to payment setup
                var invalidParams = _this.invalidParameterException.invalidParams;
                var i;
                for (i = 0; i < invalidParams.length; i++) {
                    var invalidParam = invalidParams[i];
                    if (invalidParam.name == "NO_PROFILE") {
                        _this.router.navigate(['/payment']);
                    }
                }
            }
        });
    };
    ProfileComponent.prototype.contactInfo = function () {
        this.router.navigate(['/tony']);
    };
    ProfileComponent.prototype.deleteAccount = function () {
        var _this = this;
        // this.modal.hide();
        this.isLoadingModal = true;
        this.errorMessageModal = null;
        this.invalidParameterExceptionModal = null;
        this.messagingService
            .deleteAccount()
            .then(function (response) {
            _this.isLoadingModal = false;
            _this.modal.hide();
            _this.router.navigate(['/home']);
        })
            .catch(function (response) {
            _this.isLoadingModal = false;
            if (_this.messagingService.isServerError(response)) {
                _this.errorMessageModal = "An internal error has occurred, please try again in a few minutes.";
            }
            else if (_this.messagingService.isNotAuthorized(response)) {
                _this.router.navigate(['/signuporlogin']);
            }
            else if (_this.messagingService.isInvalidParameterException(response)) {
                _this.invalidParameterExceptionModal = _this.messagingService.getInvalidParameterException(response);
            }
        });
    };
    __decorate([
        core_1.ViewChild(modal_component_1.ModalComponent)
    ], ProfileComponent.prototype, "readonly");
    ProfileComponent = __decorate([
        core_1.Component({
            selector: 'my-profile',
            templateUrl: './profile.component.html'
        })
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map