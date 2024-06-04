import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/app/shared/models/order';
import { OrdersService } from '../orders.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-order-detailed',
  templateUrl: './order-detailed.component.html',
  styleUrls: ['./order-detailed.component.scss']
})
export class OrderDetailedComponent implements OnInit {
  order!: IOrder;

  constructor(private ordersService: OrdersService, private activatedRoute: ActivatedRoute, private breadcrumbService: BreadcrumbService) {
    breadcrumbService.set('@orderDetailed', ' ');
  }

  ngOnInit(): void {
    this.getOrderDetailed(+ this.activatedRoute.snapshot.paramMap.get('id')!);
  }

  getOrderDetailed(id: number) {
    this.ordersService.getOrderDetailed(id).subscribe({
      next: response => {
        this.order = response;
        this.breadcrumbService.set('@orderDetailed', `Pourdžbina# ${this.order.id} - ${this.order.status}`)
      },
      error: error => console.log(error)
    })
  }

}
