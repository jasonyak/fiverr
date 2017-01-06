"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var LoginComponent = (function () {
    function LoginComponent(messagingService, router) {
        this.messagingService = messagingService;
        this.router = router;
        this.isLoading = false;
    }
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.isLoading = true;
        this.error = null;
        this.messagingService.authenticateUser(this.email, this.password)
            .then(function (response) {
            _this.isLoading = false;
            _this.router.navigate(['/profile']);
        })
            .catch(function (response) {
            _this.isLoading = false;
            _this.error = response;
        });
    };
    LoginComponent.prototype.isLoginDisabled = function () {
        return this.isLoading;
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'my-login',
            templateUrl: './login.component.html'
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map