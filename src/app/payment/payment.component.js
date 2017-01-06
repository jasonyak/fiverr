"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var environment_1 = require('../../environments/environment');
var PaymentComponent = (function () {
    function PaymentComponent(messagingService, router) {
        this.messagingService = messagingService;
        this.router = router;
        this.paypalSubscribeUrl = environment_1.environment.paypalSubscribeUrl;
        this.paypalReturnUrl = environment_1.environment.paypalReturnUrl;
        this.paypalNotifyUrl = environment_1.environment.paypalNotifyUrl;
        this.paypalHostButtonIdSubscribeMonthly = environment_1.environment.paypalHostButtonIdSubscribeMonthly;
        this.paypalHostButtonIdSubscribeAnnually = environment_1.environment.paypalHostButtonIdSubscribeAnnually;
        this.paypalHostButtonIdUnSubscribeMonthly = environment_1.environment.paypalHostButtonIdUnSubscribeMonthly;
        this.paypalHostButtonIdUnSubscribeAnnually = environment_1.environment.paypalHostButtonIdUnSubscribeAnnually;
        this.paypalMonthyUnsubscribeUrl = this.paypalSubscribeUrl + "?cmd=_subscr-find&alias=" + this.paypalHostButtonIdUnSubscribeMonthly;
        this.paypalAnnuallyUnsubscribeUrl = this.paypalSubscribeUrl + "?cmd=_subscr-find&alias=" + this.paypalHostButtonIdUnSubscribeAnnually;
        this.isLocal = environment_1.environment.local;
        this.isLoading = false;
        this.paymentTypeMonthlySelected = false;
        this.paymentTypeAnnuallySelected = false;
    }
    PaymentComponent.prototype.selectMonthlyPayments = function () {
        var _this = this;
        if (this.isLocal) {
            this.router.navigate(['/profilesetup']);
            return;
        }
        this.paymentTypeMonthlySelected = false;
        this.paymentTypeAnnuallySelected = false;
        this.errorMessage = null;
        this.invalidParameterException = null;
        this.isLoading = true;
        this.messagingService.createPayment()
            .then(function (response) {
            _this.isLoading = false;
            _this.invoiceNumber = response.paymentId;
            _this.paymentTypeMonthlySelected = true;
        })
            .catch(function (response) {
            _this.isLoading = false;
            if (_this.messagingService.isServerError(response)) {
                _this.errorMessage = "An internal error has occurred, please try again in a few minutes.";
            }
            else if (_this.messagingService.isNotAuthorized(response)) {
                _this.router.navigate(['/signuporlogin']);
                _this.errorMessage = "You do not have access to this page, login or sign up and try again.";
            }
            else if (_this.messagingService.isInvalidParameterException(response)) {
                _this.invalidParameterException = _this.messagingService.getInvalidParameterException(response);
            }
        });
    };
    PaymentComponent.prototype.selectAnnuallyPayments = function () {
        var _this = this;
        if (this.isLocal) {
            this.router.navigate(['/profilesetup']);
            return;
        }
        this.paymentTypeMonthlySelected = false;
        this.paymentTypeAnnuallySelected = false;
        this.errorMessage = null;
        this.invalidParameterException = null;
        this.isLoading = true;
        this.messagingService.createPayment()
            .then(function (response) {
            _this.isLoading = false;
            _this.invoiceNumber = response.paymentId;
            _this.paymentTypeAnnuallySelected = true;
        })
            .catch(function (response) {
            _this.isLoading = false;
            if (_this.messagingService.isServerError(response)) {
                _this.errorMessage = "An internal error has occurred, please try again in a few minutes.";
            }
            else if (_this.messagingService.isNotAuthorized(response)) {
                _this.router.navigate(['/signuporlogin']);
                _this.errorMessage = "You do not have access to this page, login or sign up and try again.";
            }
            else if (_this.messagingService.isInvalidParameterException(response)) {
                _this.invalidParameterException = _this.messagingService.getInvalidParameterException(response);
            }
        });
    };
    PaymentComponent = __decorate([
        core_1.Component({
            selector: 'my-enter-payment',
            templateUrl: './payment.component.html'
        })
    ], PaymentComponent);
    return PaymentComponent;
}());
exports.PaymentComponent = PaymentComponent;
//# sourceMappingURL=payment.component.js.map