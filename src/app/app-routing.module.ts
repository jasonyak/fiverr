import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingComponent } from './landing/landing.component';
import { SignUpOrLoginComponent } from './login/signuporlogin.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './login/signup.component';
import { FAQSComponent } from './faqs/faqs.component';
import { EnterPhoneComponent } from './enterphone/enterphone.component';
import { ConfirmPhoneComponent } from './confirmphone/confirmphone.component';
import { PaymentComponent } from './payment/payment.component';
import { ProfileSetupComponent } from './profilesetup/profilesetup.component';
import { ProfileComponent } from './profile/profile.component';
import { TonyInfoComponent } from './tonyinfo/tonyinfo.component';
import { SignOutComponent } from './signout/signout.component';
import { PaymentReturnComponent } from './payment/paymentreturn.component';
import { TermsComponent } from './legal/terms.component';
import { PrivacyComponent } from './legal/privacy.component';
import { JobsComponent } from './legal/jobs.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: LandingComponent
    },
    {
        path: 'signuporlogin',
        component: SignUpOrLoginComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'signup',
        component: SignUpComponent
    },
    {
        path: 'faqs',
        component: FAQSComponent
    },
    {
        path: 'enterphone',
        component: EnterPhoneComponent
    },
    {
        path: 'confirmphone',
        component: ConfirmPhoneComponent
    },
    {
        path: 'payment',
        component: PaymentComponent
    },
    {
        path: 'profilesetup',
        component: ProfileSetupComponent
    },
    {
        path: 'profile',
        component: ProfileComponent
    },
    {
        path: 'tony',
        component: TonyInfoComponent
    },
    {
        path: 'signout',
        component: SignOutComponent
    },
    {
        path: 'paymentreturn',
        component: PaymentReturnComponent
    },
    {
        path: 'privacy',
        component: PrivacyComponent
    },
    {
        path: 'terms',
        component: TermsComponent
    },
    {
        path: 'jobs',
        component: JobsComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

//Add components here for routing
export const RoutedComponents = [
    LandingComponent,
    SignUpOrLoginComponent,
    LoginComponent,
    SignUpComponent,
    FAQSComponent,
    EnterPhoneComponent,
    ConfirmPhoneComponent,
    PaymentComponent,
    ProfileSetupComponent,
    ProfileComponent,
    TonyInfoComponent,
    SignOutComponent,
    PaymentReturnComponent,
    PrivacyComponent,
    TermsComponent,
    JobsComponent
];
