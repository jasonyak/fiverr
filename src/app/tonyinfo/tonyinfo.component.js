"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var environment_1 = require('../../environments/environment');
var TonyInfoComponent = (function () {
    function TonyInfoComponent(messagingService, router) {
        this.messagingService = messagingService;
        this.router = router;
        this.isLoading = false;
        this.hasAccess = false;
        this.twilioNumber = environment_1.environment.twilioPhoneNumber;
    }
    TonyInfoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.isLoading = true;
        this.errorMessage = null;
        this.messagingService
            .readUserProfile()
            .then(function (response) {
            _this.isLoading = false;
            _this.firstname = response.firstname;
            _this.hasAccess = true;
        })
            .catch(function (response) {
            _this.isLoading = false;
            _this.hasAccess = false;
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
    TonyInfoComponent = __decorate([
        core_1.Component({
            selector: 'my-tony-info',
            templateUrl: './tonyinfo.component.html'
        })
    ], TonyInfoComponent);
    return TonyInfoComponent;
}());
exports.TonyInfoComponent = TonyInfoComponent;
//# sourceMappingURL=tonyinfo.component.js.map