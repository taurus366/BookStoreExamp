import { Component, OnInit } from '@angular/core';
import {AdminService} from "../../admin.service";
import {IOrder} from "../../shared/interfaces/IOrder";
import {IView} from "../../shared/interfaces/IView";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orders: IOrder[] | undefined;
  order: Array<IView> = [];

  constructor(private adminService:AdminService) {
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
      // console.log(key , value);
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

      // for (const userElement of value.User) {
      //     console.log(userElement.phoneNumber)
      // }

      let totalPrice = 0;

      // @ts-ignore
      for (const order1 of data['orders']) {
        let price = order1.book.price;
        let bookCount = order1.bookCount;
        totalPrice += price * bookCount;
      }

      // @ts-ignore
      data['totalPrice'] = totalPrice;

      // @ts-ignore
      // for (const item of value) {
      //
      // }

      // @ts-ignore
      this.order.push(data);



    // this.order.push()
    }
     console.log(this.order)
    // console.log(this.order)

    // console.log(Object.keys(this.orders!))
    // console.log(Object.values(this.orders!))
   // Object.entries(this.orders!)
   }

}
