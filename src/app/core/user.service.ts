import {Inject, Injectable} from "@angular/core";
import {LocalStorage} from "./injection-tokens";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // user: IUser | undefined;


get isLogged(): boolean {

  return false;
}

  constructor(@Inject(LocalStorage) private localStorage: Window['localStorage']) {
    try {
      const localStorageUser = JSON.parse(this.localStorage.getItem('<USER>') || 'ERROR');
      // this.user = JSON.parse(localStorageUser);
    } catch {
      // this.user = undefined;
    }
  }

  login(email: string, password: string): void {

  }

  logout(): void {
    // this.user = undefined;
    // this.localStorage.removeItem('<USER>');
  }









}
