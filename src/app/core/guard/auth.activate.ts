import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {UserService} from "../user.service";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthActivate implements CanActivate {

  constructor(private router:Router, private userService:UserService) {
  }


  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const { authenticationRequired , authenticationFailureRedirectUrl} = route.data;
    if (typeof authenticationRequired === 'boolean' && authenticationRequired === this.userService.isLogged){
      return true;
    }
    if (authenticationRequired === this.userService.isLogged || authenticationRequired === false){
      return true;
    }
    if (authenticationRequired === false){
      return true;
    }
    if (typeof authenticationFailureRedirectUrl === 'string'){
      this.router.parseUrl(authenticationFailureRedirectUrl);
    }
    return this.router.parseUrl(authenticationFailureRedirectUrl || '/');

  }


}
