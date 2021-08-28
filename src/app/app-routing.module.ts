import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./core/home/home.component";
import {BooksComponent} from "./core/books/books.component";
import {RegisterComponent} from "./core/register/register.component";
import {LoginComponent} from "./core/login/login.component";
import {ContactComponent} from "./core/contact/contact.component";
import {AuthActivate} from "./core/guard/auth.activate";
import {BookComponent} from "./core/book/book.component";
import {ProfileComponent} from "./core/profile/profile.component";
import {ShoppingCardComponent} from "./core/shopping-card/shopping-card.component";
import {OrderComponent} from "./core/order/order.component";
import {NewBookComponent} from "./core/new-book/new-book.component";

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
  {
    path: 'shoppingCart',
    component: ShoppingCardComponent
  },
  {
    path: 'orders',
    component: OrderComponent
  },
  {
    path: 'addBook',
    component: NewBookComponent,
    canActivate: [AuthActivate],
    data: {
      authenticationRequired: true,
      authenticationFailureRedirectUrl: '/'
    }
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
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthActivate],
    data: {
      authenticationRequired: true,
      authenticationFailureRedirectUrl: '/'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
