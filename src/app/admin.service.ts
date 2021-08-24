import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IUser} from "./shared/interfaces/IUser";
import {environment} from "../environments/environment";
import {tap} from "rxjs/operators";
import {UserService} from "./core/user.service";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, private userService: UserService) { }


  // continue to think!
  fetchOrders() {
    return  this.http.post<IUser>(`${corsProxy + environment.apiUrl}/users/login`,{authToken: this.userService.user?.session.authToken})
  }
}
