export class Payment {
    paymentId : number;
    paymentStatus : String;
    paymentType : String;
    price : String;

    constructor(paymentId : number, paymentStatus : String, paymentType : String, price : String) {
        this.paymentId = paymentId;
        this.paymentStatus = paymentStatus;
        this.paymentType = paymentType;
        this.price = price;
    }
}
