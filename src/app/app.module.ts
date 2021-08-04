import {NgModule, PLATFORM_ID} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CoreModule} from "./core/core.module";
import {AuthActivate} from "./core/guard/auth.activate";
import {isPlatformBrowser, isPlatformServer} from "@angular/common";
import {LocalStorage} from "./core/injection-tokens";

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CoreModule
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
  },AuthActivate],
  bootstrap: [AppComponent]
})
export class AppModule { }
