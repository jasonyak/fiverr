"use strict";
var Payment = (function () {
    function Payment(paymentId, paymentStatus, paymentType, price) {
        this.paymentId = paymentId;
        this.paymentStatus = paymentStatus;
        this.paymentType = paymentType;
        this.price = price;
    }
    return Payment;
}());
exports.Payment = Payment;
//# sourceMappingURL=Payment.js.map