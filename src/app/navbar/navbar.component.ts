import { Component, Input } from '@angular/core';

@Component({
    selector: 'my-navbar',
    templateUrl: './navbar.html'
})
export class NavbarComponent {
    @Input() leftButtons: string[]; //format: button@link
    @Input() rightButtons: string[];

    public appBrand: string;

    constructor() {
        this.appBrand = "Tony";
    }

    getButtons(leftOrRight) : string[] {
        var buttons = [];

        if(leftOrRight == "left") {
            for(var i in this.leftButtons) {
                var left = this.leftButtons[i];
                var but = left.split("@")[0];
                buttons.push(but);
            }
        } else if(leftOrRight == "right") {
            for(var i in this.rightButtons) {
                var right = this.rightButtons[i];
                var but = right.split("@")[0];
                buttons.push(but);
            }
        }

        return buttons;
    }

    getLinkForButton(button, leftOrRight) : string {
        if(leftOrRight == "left") {
            for(var i in this.leftButtons) {
                var left = this.leftButtons[i];
                var but = left.split("@")[0];
                if(but == button) {
                    return left.split("@")[1];
                }
            }
        } else if(leftOrRight == "right") {
            for(var i in this.rightButtons) {
                var right = this.rightButtons[i];
                var but = right.split("@")[0];
                if(but == button) {
                    return right.split("@")[1];
                }
            }
        }
    }
}
