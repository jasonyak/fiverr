"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var platform_browser_1 = require('@angular/platform-browser');
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var common_1 = require('@angular/common');
var cookies_service_1 = require('angular2-cookie/services/cookies.service');
var app_component_1 = require('./app.component');
var footer_component_1 = require('./footer/footer.component');
var navbar_component_1 = require('./navbar/navbar.component');
var MessagingService_1 = require('./shared/services/MessagingService');
var app_routing_module_1 = require('./app-routing.module');
var modal_component_1 = require('./modal/modal.component');
var error_component_1 = require('./error/error.component');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                footer_component_1.FooterComponent,
                navbar_component_1.NavbarComponent,
                app_routing_module_1.RoutedComponents,
                modal_component_1.ModalComponent,
                error_component_1.ErrorComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                app_routing_module_1.AppRoutingModule
            ],
            providers: [
                MessagingService_1.MessagingService,
                cookies_service_1.CookieService,
                { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy }
            ],
            bootstrap: [
                app_component_1.AppComponent
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map