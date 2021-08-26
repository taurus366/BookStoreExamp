import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IUser} from "./shared/interfaces/IUser";
import {environment} from "../environments/environment";
import {UserService} from "./core/user.service";
import {IOrder} from "./shared/interfaces/IOrder";
const corsProxy = 'http://192.168.0.100:8181/'

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, private userService: UserService) { }


  // continue to think!
  fetchOrders() {
    return  this.http.post<IOrder[]>(`${corsProxy + environment.apiUrl}/order/get`,{authToken: this.userService.user?.session.authToken}).toPromise()
  }

  acceptOrder(email : string) {
    return  this.http.post(`${corsProxy + environment.apiUrl}/order/delete`,{authToken: this.userService.user?.session.authToken,emailAddress: email});
  }


}
