"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ConfirmPhoneComponent = (function () {
    function ConfirmPhoneComponent(messagingService, router) {
        this.messagingService = messagingService;
        this.router = router;
        this.isSubmitVerificationCode = false;
        this.isRequestVerificationCode = false;
    }
    ConfirmPhoneComponent.prototype.submitVerificationCode = function () {
        var _this = this;
        this.isSubmitVerificationCode = true;
        this.errorMessage = null;
        this.messagingService.submitVerificationCode(this.verificationCode)
            .then(function (response) {
            _this.isSubmitVerificationCode = false;
            _this.router.navigate(['/payment']);
        })
            .catch(function (response) {
            _this.isSubmitVerificationCode = false;
            if (_this.messagingService.isServerError(response)) {
                _this.errorMessage = "An internal error has occurred, please try again in a few minutes.";
            }
            else if (_this.messagingService.isNotAuthorized(response)) {
                _this.router.navigate(['/signuporlogin']);
            }
            else if (_this.messagingService.isInvalidParameterException(response)) {
                _this.invalidParameterException = _this.messagingService.getInvalidParameterException(response);
            }
        });
    };
    ConfirmPhoneComponent.prototype.requestVerificationCode = function () {
        this.isRequestVerificationCode = true;
        this.messagingService.requestVerificationCode();
        // delay(2000);
        this.isRequestVerificationCode = false;
    };
    ConfirmPhoneComponent.prototype.isSubmitVerificationCodeDisabled = function () {
        return this.isSubmitVerificationCode;
    };
    ConfirmPhoneComponent.prototype.isRequestVerificationCodeDisabled = function () {
        return this.isRequestVerificationCode;
    };
    ConfirmPhoneComponent.prototype.delay = function (ms) {
        return new Promise(function (resolve) { return setTimeout(resolve, ms); });
    };
    ConfirmPhoneComponent = __decorate([
        core_1.Component({
            selector: 'my-confirm-phone',
            templateUrl: './confirmphone.component.html'
        })
    ], ConfirmPhoneComponent);
    return ConfirmPhoneComponent;
}());
exports.ConfirmPhoneComponent = ConfirmPhoneComponent;
//# sourceMappingURL=confirmphone.component.js.map