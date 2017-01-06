import {InvalidParam} from "./InvalidParam";

export class InvalidParameterException {
    invalidParams : InvalidParam[];
    status : number;

    constructor(invalidParams : InvalidParam[], status : number) {
        this.invalidParams = invalidParams;
        this.status = status;
    }
}