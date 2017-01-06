"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var SignUpComponent = (function () {
    function SignUpComponent(messagingService, router) {
        this.messagingService = messagingService;
        this.router = router;
        this.isLoading = false;
    }
    SignUpComponent.prototype.registerUser = function () {
        var _this = this;
        this.errorMessage = null;
        this.successMessage = null;
        this.invalidParameterException = null;
        this.isLoading = false;
        if (this.password != this.rePassword) {
            this.errorMessage = "Passwords do not match.";
        }
        else {
            this.isLoading = true;
            this.messagingService.registerNewUser(this.email, this.password)
                .then(function (response) {
                _this.isLoading = false;
                _this.successMessage = "Your account has been created!";
                _this.router.navigate(['/enterphone']);
            })
                .catch(function (response) {
                _this.isLoading = false;
                if (_this.messagingService.isInvalidParameterException(response)) {
                    _this.invalidParameterException = _this.messagingService.getInvalidParameterException(response);
                }
                else {
                    _this.errorMessage = "An internal error has occurred, please try again in a few minutes.";
                }
            });
        }
    };
    SignUpComponent.prototype.isDisabled = function () {
        // If we are loading from service, disable the button
        return this.isLoading;
    };
    SignUpComponent = __decorate([
        core_1.Component({
            selector: 'my-signup',
            templateUrl: './signup.component.html'
        })
    ], SignUpComponent);
    return SignUpComponent;
}());
exports.SignUpComponent = SignUpComponent;
//# sourceMappingURL=signup.component.js.map