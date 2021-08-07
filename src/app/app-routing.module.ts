import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./core/home/home.component";
import {BooksComponent} from "./core/books/books.component";
import {RegisterComponent} from "./core/register/register.component";
import {LoginComponent} from "./core/login/login.component";
import {ContactComponent} from "./core/contact/contact.component";
import {AuthActivate} from "./core/guard/auth.activate";
import {BookComponent} from "./core/book/book.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  // {
  //   path: 'books',
  //   component: BooksComponent,
  //   canActivate: [AuthActivate],
  //   data: {
  //     authenticationRequired: false,
  //     authenticationFailureRedirectUrl: '/'
  //   }
  // },
  {
    path: 'books',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: BooksComponent,
        canActivate: [AuthActivate],
        data: {
          authenticationRequired: false,
          authenticationFailureRedirectUrl: '/'
        }
      },
      {
        path: ':bookId',
        component: BookComponent,
        canActivate: [AuthActivate],
        data: {
          authenticationRequired: false,
          authenticationFailureRedirectUrl: '/'
        }
      }
    ]
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
