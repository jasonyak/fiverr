"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ProfileSetupComponent = (function () {
    function ProfileSetupComponent(messagingService, router) {
        this.messagingService = messagingService;
        this.router = router;
        this.isLoading = false;
    }
    ProfileSetupComponent.prototype.setupProfile = function () {
        var _this = this;
        this.errorMessage = null;
        this.isLoading = true;
        this.messagingService.createUserProfile(this.firstname, this.lastname, this.birthDate, this.country, this.stateOrProvince, this.city)
            .then(function (response) {
            _this.isLoading = false;
            _this.router.navigate(['/tony']);
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
            }
        });
    };
    ProfileSetupComponent.prototype.isDisabled = function () {
        return this.isLoading;
    };
    ProfileSetupComponent = __decorate([
        core_1.Component({
            selector: 'my-profile-setup',
            templateUrl: './profilesetup.component.html'
        })
    ], ProfileSetupComponent);
    return ProfileSetupComponent;
}());
exports.ProfileSetupComponent = ProfileSetupComponent;
//# sourceMappingURL=profilesetup.component.js.map