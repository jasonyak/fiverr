export const environment = {
    production: false,
    local : true,
    apiBaseUrl : "http://localhost:8080/MessagingService/v1",
    twilioPhoneNumber : "1-201-831-7313",
    paypalSubscribeUrl : "https://www.sandbox.paypal.com/cgi-bin/webscr",
    paypalReturnUrl : "http://localhost:4200/#/paymentreturn",
    paypalNotifyUrl : "http://localhost:8080/MessagingService/v1/payment/paypal/subscribe/ipn",
    paypalHostButtonIdSubscribeMonthly : "Doesn't matter",
    paypalHostButtonIdSubscribeAnnually : "Doesn't matter",
    paypalHostButtonIdUnSubscribeMonthly : "Doesn't matter",
    paypalHostButtonIdUnSubscribeAnnually : "Doesn't matter",
    paypalHostButtonIdUnSubscribe : "Doesn't matter"
};
