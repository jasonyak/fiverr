"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var NavbarComponent = (function () {
    function NavbarComponent() {
        this.appBrand = "Tony";
    }
    NavbarComponent.prototype.getButtons = function (leftOrRight) {
        var buttons = [];
        if (leftOrRight == "left") {
            for (var i in this.leftButtons) {
                var left = this.leftButtons[i];
                var but = left.split("@")[0];
                buttons.push(but);
            }
        }
        else if (leftOrRight == "right") {
            for (var i in this.rightButtons) {
                var right = this.rightButtons[i];
                var but = right.split("@")[0];
                buttons.push(but);
            }
        }
        return buttons;
    };
    NavbarComponent.prototype.getLinkForButton = function (button, leftOrRight) {
        if (leftOrRight == "left") {
            for (var i in this.leftButtons) {
                var left = this.leftButtons[i];
                var but = left.split("@")[0];
                if (but == button) {
                    return left.split("@")[1];
                }
            }
        }
        else if (leftOrRight == "right") {
            for (var i in this.rightButtons) {
                var right = this.rightButtons[i];
                var but = right.split("@")[0];
                if (but == button) {
                    return right.split("@")[1];
                }
            }
        }
    };
    __decorate([
        core_1.Input()
    ], NavbarComponent.prototype, "leftButtons");
    __decorate([
        //format: button@link
        core_1.Input()
    ], NavbarComponent.prototype, "rightButtons");
    NavbarComponent = __decorate([
        core_1.Component({
            selector: 'my-navbar',
            templateUrl: './navbar.html'
        })
    ], NavbarComponent);
    return NavbarComponent;
}());
exports.NavbarComponent = NavbarComponent;
//# sourceMappingURL=navbar.component.js.map