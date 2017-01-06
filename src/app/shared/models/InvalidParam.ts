export class InvalidParam {
    name : String;
    message : String;
    value : String;
    
    constructor(name : String, message : String, value : String) {
        this.name = name;
        this.message = message;
        this.value = value;
    }
}