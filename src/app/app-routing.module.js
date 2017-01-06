"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var landing_component_1 = require('./landing/landing.component');
var signuporlogin_component_1 = require('./login/signuporlogin.component');
var login_component_1 = require('./login/login.component');
var signup_component_1 = require('./login/signup.component');
var faqs_component_1 = require('./faqs/faqs.component');
var enterphone_component_1 = require('./enterphone/enterphone.component');
var confirmphone_component_1 = require('./confirmphone/confirmphone.component');
var payment_component_1 = require('./payment/payment.component');
var profilesetup_component_1 = require('./profilesetup/profilesetup.component');
var profile_component_1 = require('./profile/profile.component');
var tonyinfo_component_1 = require('./tonyinfo/tonyinfo.component');
var signout_component_1 = require('./signout/signout.component');
var paymentreturn_component_1 = require('./payment/paymentreturn.component');
var terms_component_1 = require('./legal/terms.component');
var privacy_component_1 = require('./legal/privacy.component');
var jobs_component_1 = require('./legal/jobs.component');
var routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: landing_component_1.LandingComponent
    },
    {
        path: 'signuporlogin',
        component: signuporlogin_component_1.SignUpOrLoginComponent
    },
    {
        path: 'login',
        component: login_component_1.LoginComponent
    },
    {
        path: 'signup',
        component: signup_component_1.SignUpComponent
    },
    {
        path: 'faqs',
        component: faqs_component_1.FAQSComponent
    },
    {
        path: 'enterphone',
        component: enterphone_component_1.EnterPhoneComponent
    },
    {
        path: 'confirmphone',
        component: confirmphone_component_1.ConfirmPhoneComponent
    },
    {
        path: 'payment',
        component: payment_component_1.PaymentComponent
    },
    {
        path: 'profilesetup',
        component: profilesetup_component_1.ProfileSetupComponent
    },
    {
        path: 'profile',
        component: profile_component_1.ProfileComponent
    },
    {
        path: 'tony',
        component: tonyinfo_component_1.TonyInfoComponent
    },
    {
        path: 'signout',
        component: signout_component_1.SignOutComponent
    },
    {
        path: 'paymentreturn',
        component: paymentreturn_component_1.PaymentReturnComponent
    },
    {
        path: 'privacy',
        component: privacy_component_1.PrivacyComponent
    },
    {
        path: 'terms',
        component: terms_component_1.TermsComponent
    },
    {
        path: 'jobs',
        component: jobs_component_1.JobsComponent
    }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//Add components here for routing
exports.RoutedComponents = [
    landing_component_1.LandingComponent,
    signuporlogin_component_1.SignUpOrLoginComponent,
    login_component_1.LoginComponent,
    signup_component_1.SignUpComponent,
    faqs_component_1.FAQSComponent,
    enterphone_component_1.EnterPhoneComponent,
    confirmphone_component_1.ConfirmPhoneComponent,
    payment_component_1.PaymentComponent,
    profilesetup_component_1.ProfileSetupComponent,
    profile_component_1.ProfileComponent,
    tonyinfo_component_1.TonyInfoComponent,
    signout_component_1.SignOutComponent,
    paymentreturn_component_1.PaymentReturnComponent,
    privacy_component_1.PrivacyComponent,
    terms_component_1.TermsComponent,
    jobs_component_1.JobsComponent
];
//# sourceMappingURL=app-routing.module.js.map