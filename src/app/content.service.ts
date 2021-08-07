import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IBook} from "./shared/interfaces/IBook";
import {environment} from "../environments/environment";
const corsProxy = 'http://192.168.0.100:8181/'
@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private http: HttpClient) { }

  loadBooks() {
    return this.http.get<IBook[]>(`${corsProxy + environment.apiUrl}/books`);
  }

  loadBookById(id : string) {
    return this.http.get<IBook>(`${corsProxy + environment.apiUrl}/books/${id}`);
  }
}
