import { Component, OnInit } from '@angular/core';
import { IOrder } from '../shared/models/order';
import { OrdersService } from './orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: IOrder[] = [];

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.getOrdersForUser();
    console.log(this.orders)
  }

  getOrdersForUser() {
    this.ordersService.getOrdersForUser().subscribe({
      next: response => {
        this.orders = response;
        console.log(response);
      },
      error: error => console.log(error)
    })
  }

}
