import {NgModule, PLATFORM_ID} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CoreModule} from "./core/core.module";
import {AuthActivate} from "./core/guard/auth.activate";
import {isPlatformBrowser, isPlatformServer} from "@angular/common";
import {LocalStorage} from "./core/injection-tokens";
import {HttpClientModule} from "@angular/common/http";
import {ContentService} from "./content.service";

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CoreModule,
      HttpClientModule
    ],
  providers: [ContentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
