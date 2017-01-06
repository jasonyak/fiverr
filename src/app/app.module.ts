import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import {CookieService} from 'angular2-cookie/services/cookies.service';
import {AppComponent} from './app.component';
import {FooterComponent} from './footer/footer.component';
import {NavbarComponent} from './navbar/navbar.component';
import {MessagingService} from './shared/services/MessagingService';
import {AppRoutingModule, RoutedComponents} from './app-routing.module';
import {ModalComponent} from './modal/modal.component';
import {ErrorComponent} from './error/error.component';

@NgModule({
    declarations: [
        AppComponent,
        FooterComponent,
        NavbarComponent,
        RoutedComponents,
        ModalComponent,
        ErrorComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule
    ],
    providers: [
        MessagingService,
        CookieService,
        {provide: LocationStrategy, useClass: HashLocationStrategy}
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {

}
