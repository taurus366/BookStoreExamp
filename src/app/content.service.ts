import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IBook} from "./shared/interfaces/IBook";
import {environment} from "../environments/environment";
import {tap} from "rxjs/operators";
import {LocalStorage} from "./shared/injection-tokens";
import {IUser} from "./shared/interfaces/IUser";
const corsProxy = 'http://192.168.0.100:8181/'
@Injectable({
  providedIn: 'root'
})
export class ContentService {

  // user: IUser | undefined;

  // get isLogged(): boolean {
  //   this.localStorage.getItem('book_store') ? this.user = JSON.parse(<string>this.localStorage.getItem('book_store')) : undefined;
  //   return !!this.user;
  // }

  constructor(private http: HttpClient) {

  }

  loadBooks() {
    return this.http.get<IBook[]>(`${corsProxy + environment.apiUrl}/books`);
  }

  loadBookById(id : string) {
    return this.http.get<IBook>(`${corsProxy + environment.apiUrl}/books/${id}`);
  }

  login(email: string, password: string): void {

  }



  // register() {
  //   this.http.post()
  // }
}
