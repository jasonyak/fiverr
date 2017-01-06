import { Component, Input } from '@angular/core';
import {InvalidParameterException} from "../shared/models/InvalidParameterException";

@Component({
    selector: 'my-error',
    templateUrl: './error.component.html'
})
export class ErrorComponent {
    @Input() errorMessage : String;
    @Input() invalidParameterException : InvalidParameterException;
}
