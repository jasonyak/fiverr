"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var SignOutComponent = (function () {
    function SignOutComponent(messagingService, router) {
        this.messagingService = messagingService;
        this.router = router;
    }
    SignOutComponent.prototype.ngOnInit = function () {
        this.messagingService.clearCookies();
        this.router.navigate(['/home']);
    };
    SignOutComponent = __decorate([
        core_1.Component({
            selector: 'my-signout',
            template: '<div></div>'
        })
    ], SignOutComponent);
    return SignOutComponent;
}());
exports.SignOutComponent = SignOutComponent;
//# sourceMappingURL=signout.component.js.map