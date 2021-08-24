import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UserService} from "../user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private userService: UserService, private router:Router , private cdRef:ChangeDetectorRef) {
    // this.cdRef.detectChanges();

  }

  get isAdmin(): boolean {
    return this.userService.user?.role === 'ADMIN';
  }

  get isLogged(): boolean {
    return this.userService.isLogged;
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
  }




}
