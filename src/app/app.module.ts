import {NgModule, PLATFORM_ID} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CoreModule} from "./core/core.module";
import {AuthActivate} from "./core/guard/auth.activate";
import {isPlatformBrowser, isPlatformServer} from "@angular/common";
import {LocalStorage} from "./core/injection-tokens";
import {HttpClientModule} from "@angular/common/http";
import {ContentService} from "./content.service";
import {SameValueDirective} from './core/same-value.directive';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RegisterComponent} from "./core/register/register.component";
import {CustomValidatorDirective} from './shared/custom-validator.directive';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    ReactiveFormsModule
  ],
  providers: [ContentService],

  bootstrap: [AppComponent]
})
export class AppModule {
}
