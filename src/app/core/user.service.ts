import {Inject, Injectable} from "@angular/core";
import {LocalStorage} from "./injection-tokens";
import {IUser} from "../shared/interfaces/IUser";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs/operators";
import {ICart} from "../shared/interfaces/ICart";
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
      console.log(this.user)
    } catch {
      this.user = undefined;
    }
  }



  populateLocalStorage(user: IUser) {
  if (this.localStorage.getItem('book_store') !== null){
    this.localStorage.removeItem('book_store');
  }
    this.localStorage.setItem('book_store',JSON.stringify(this.user));

  }

  login(data: {email: string; password: string;}) {
   return  this.http.post<IUser>(`${corsProxy + environment.apiUrl}/users/login`,data).pipe(
      tap((user) => this.user = user)
    );
  }

  register(data: {email: string; password: string; firstName: string; secondName: string; address: string; phoneNumber: string; gender: string; }){
    return  this.http.post<IUser>(`${corsProxy + environment.apiUrl}/users/register`, data).pipe(
      tap((user) => this.user = user)
    );
  }

  updateUserNewInfo(data: {address: string; phoneNumber: string; authToken: string}) {
  data["authToken"] = <string>this.user?.session.authToken;
    return this.http.post<IUser>(`${corsProxy + environment.apiUrl}/users/change/information`,data).pipe(
      tap((user) => this.user = user)
    );
  }

  logout(): void {
    this.user = undefined;
    this.localStorage.removeItem('book_store');
  }

  addToCart(data: {id: number; authToken: string}) {
  data.authToken = <string>this.user?.session.authToken;
 return this.http.post(`${corsProxy + environment.apiUrl}/cart/post`,data);
  }

  fetchCart() {
  return this.http.post<ICart[]>(`${corsProxy + environment.apiUrl}/cart/get`,{authToken:this.user?.session.authToken});
  }

  deleteBtnCommand(id: number){
  return this.http.post(`${corsProxy + environment.apiUrl}/cart/put`,{authToken:this.user?.session.authToken,cartId:id,type:'delete'})
  }

  quantityUpBtn(id: number){
  return this.http.post(`${corsProxy + environment.apiUrl}/cart/put`,{authToken:this.user?.session.authToken,cartId:id,type:'plus'})
  }
  quantityDownBtn(id: number){
    return this.http.post(`${corsProxy + environment.apiUrl}/cart/put`,{authToken:this.user?.session.authToken,cartId:id,type:'minus'})

  }
  makeOrder(){
  return this.http.post(`${corsProxy + environment.apiUrl}/order/post`,{authToken:this.user?.session.authToken});
  }









}
