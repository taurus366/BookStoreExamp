import {NgModule, PLATFORM_ID} from '@angular/core';
import {CommonModule, isPlatformBrowser, isPlatformServer} from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { BooksComponent } from './books/books.component';
import {RouterModule} from "@angular/router";
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ContactComponent } from './contact/contact.component';
import {ContentService} from "../content.service";
import {HttpClient, HttpClientModule, HttpHandler} from "@angular/common/http";
import {LocalStorage} from "./injection-tokens";
import {AuthActivate} from "./guard/auth.activate";
import { BookComponent } from './book/book.component';
import {FormsModule} from "@angular/forms";
import {AppModule} from "../app.module";
import { SameValueDirective } from './same-value.directive';



@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        HomeComponent,
        BooksComponent,
        RegisterComponent,
        LoginComponent,
        ContactComponent,
        BookComponent,
        SameValueDirective,
    ],
  exports: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  providers: [{
    provide: LocalStorage,
    useFactory: (platformId: Object) => {
      if (isPlatformBrowser(platformId)) {
        return window.localStorage;
      }
      if (isPlatformServer(platformId)) {
        return class implements Storage {
          length = 0;
          private data = {};

          clear(): void {
            this.data = {};
          }

          getItem(key: string): string | null {
            // @ts-ignore
            return this.data[key];
          }

          key(index: number): string | null {
            // @ts-ignore
            return undefined;
          }

          removeItem(key: string): void {
            // @ts-ignore
            const {[key]: removedItem, ...others} = this.data;
            this.data = others;
          }

          setItem(key: string, value: string): void {
            // @ts-ignore
            this.data[key] = value;
          }

        }
      }
      throw Error('NOT IMPLEMENTED');

    },
    deps: [PLATFORM_ID]
    // useValue: window.localStorage
  },AuthActivate,ContentService]
})
export class CoreModule { }
