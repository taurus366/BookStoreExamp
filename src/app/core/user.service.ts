import {Inject, Injectable} from "@angular/core";
import {LocalStorage} from "./injection-tokens";
import {IUser} from "../shared/interfaces/IUser";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs/operators";
const corsProxy = 'http://192.168.0.100:8181/'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // user: IUser | undefined;
  user: IUser | undefined;

get isLogged(): boolean {
  this.localStorage.getItem('book_store') ? this.user = JSON.parse(<string>this.localStorage.getItem('book_store')) : undefined;
  return !!this.user;

}

  constructor(private http: HttpClient,@Inject(LocalStorage) private localStorage: Window['localStorage']) {
    try {
      const localStorageUser = JSON.parse(this.localStorage.getItem('book_store') || 'ERROR');
      this.user = JSON.parse(localStorageUser);
    } catch {
      this.user = undefined;
    }
  }

  populateLocalStorage(user: IUser) {
    this.localStorage.setItem('book_store',JSON.stringify(this.user));

  }

  login(email: string, password: string): void {

  }

  register(data: {email: string; password: string; firstName: string; secondName: string; address: string; phoneNumber: string; gender: string; }){
    return  this.http.post<IUser>(`${corsProxy + environment.apiUrl}/users/register`, data).pipe(
      tap((user) => this.user = user)
    );
  }
  logout(): void {
    this.user = undefined;
    this.localStorage.removeItem('book_store');
  }









}
