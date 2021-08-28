import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userService: UserService, private route:Router) {
    this.routeAdmin();
  }

  ngOnInit(): void {
  }

   routeAdmin() {
    if (this.userService.isLogged) {
      if ( this.userService.user?.role === 'ADMIN') {
         this.route.navigate(['/orders']);
      } else if (this.userService.user?.role === 'CLIENT') {
         this.route.navigate(['/books']);
      }
    }
  }

}
