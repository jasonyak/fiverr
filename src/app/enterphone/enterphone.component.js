"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var EnterPhoneComponent = (function () {
    function EnterPhoneComponent(messagingService, router) {
        this.messagingService = messagingService;
        this.router = router;
        this.isLoading = false;
    }
    EnterPhoneComponent.prototype.submitPhoneNumber = function () {
        var _this = this;
        this.isLoading = true;
        this.errorMessage = null;
        var phoneNumberNoChars = this.phoneNumber.replace(/\D/g, '');
        this.messagingService.submitPhoneNumber(phoneNumberNoChars)
            .then(function (response) {
            _this.isLoading = false;
            _this.messagingService.requestVerificationCode();
            _this.router.navigate(['/confirmphone']);
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
            }
        });
    };
    EnterPhoneComponent.prototype.isDisabled = function () {
        return this.isLoading;
    };
    EnterPhoneComponent = __decorate([
        core_1.Component({
            selector: 'my-enter-phone',
            templateUrl: './enterphone.component.html'
        })
    ], EnterPhoneComponent);
    return EnterPhoneComponent;
}());
exports.EnterPhoneComponent = EnterPhoneComponent;
//# sourceMappingURL=enterphone.component.js.map