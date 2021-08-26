import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../admin.service";
import {IOrder} from "../../shared/interfaces/IOrder";
import {IView} from "../../shared/interfaces/IView";
import {Router} from "@angular/router";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orders: IOrder[] | undefined;
  order: Array<IView> = [];

  constructor(private adminService:AdminService, private route:Router) {
   this.fetchOrders();
  }

  ngOnInit(): void {
  }

   async fetchOrders() {
     await this.adminService.fetchOrders().then(r => this.orders = r);
     // console.log(this.orders)
    await this.finish();
   }
  async finish() {

    for (const [key, value] of Object.entries(this.orders!)){
      let data = {};
      // @ts-ignore
      data['fullName'] = value[0].fullName;
      // @ts-ignore
      data['phoneNumber'] = value[0].phoneNumber;
      // @ts-ignore
      data['address'] = value[0].address;
      // @ts-ignore
      data['orderDate'] = value[0].orderDate;
      // @ts-ignore
      data['orders'] = value;

      let totalPrice = 0;
      let emailAddress = '';

      // @ts-ignore
      for (const order1 of data['orders']) {
        let price = order1.book.price;
        let bookCount = order1.bookCount;
        totalPrice += price * bookCount;
        emailAddress = order1.user.email;
      }
      // @ts-ignore
      data['emailAddress'] = emailAddress;
      // @ts-ignore
      data['totalPrice'] = totalPrice;

      // @ts-ignore
      this.order.push(data);
      // console.log(this.order)
    }
     // console.log(this.orders)
   }

  acceptOrder(email: string) {
    this.adminService.acceptOrder(email).subscribe({
      next: value => {
        alert(value);
        let currentUrl = this.route.url;
        this.route.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.route.navigate([currentUrl]);
        });
      },
      error: err => {
        console.log(err.error);
      }
    });
  }

  // deleteOrder() {
  //
  // }
}
