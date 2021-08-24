import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import {ICart} from "../../shared/interfaces/ICart";
import {Router} from "@angular/router";
import {HeaderComponent} from "../header/header.component";

@Component({
  selector: 'app-shopping-card',
  templateUrl: './shopping-card.component.html',
  styleUrls: ['./shopping-card.component.css']
})
export class ShoppingCardComponent implements OnInit {

  carts : ICart[] | undefined;

  constructor(private userService: UserService,private route: Router, private message: HeaderComponent) {
    this.fetchUserCartFromServer();
  }

  ngOnInit(): void {
  }

 async fetchUserCartFromServer() {
  this.userService.fetchCart().subscribe(carts => carts.length === 0 ? this.carts = undefined : this.carts = carts)
  // console.log(this.carts?.length)
  }

  deleteCommand(id: number) {
    this.userService.deleteBtnCommand(id).subscribe({
      next: value => {
        let currentUrl = this.route.url;
        this.route.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.route.navigate([currentUrl]);
        });
        alert(value)
      },
      error: err => {
        alert(err.error);
      }
    })
  }

  quantityDownBtn(id: number) {
    this.userService.quantityDownBtn(id).subscribe({
      next: value => {
        let currentUrl = this.route.url;
        this.route.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.route.navigate([currentUrl]);
        });
      },
      error: err => {
        alert(err.error);
      }
    });
  }

  quantityUpBtn(id: number) {
    this.userService.quantityUpBtn(id).subscribe({
      next: value => {
        let currentUrl = this.route.url;
        this.route.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.route.navigate([currentUrl]);
        });
      },
      error: err => {
        alert(err.error);
      }
    })
  }


  makeOrder() {
    this.userService.makeOrder().subscribe({
      next: value => {
        let currentUrl = this.route.url;
        this.route.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.route.navigate([currentUrl]);
        });

      alert(value);

      },
      error: err => {
        alert(err.error);
      }
    })
  }
}
