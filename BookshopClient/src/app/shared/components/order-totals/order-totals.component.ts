import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IShoppingCartTotals } from '../../models/shoppingCart';
import { ShoppingCartService } from 'src/app/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-order-totals',
  templateUrl: './order-totals.component.html',
  styleUrls: ['./order-totals.component.scss']
})
export class OrderTotalsComponent implements OnInit {
  shoppingCartTotal$!: Observable<IShoppingCartTotals | null>;

  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.shoppingCartTotal$ = this.shoppingCartService.shoppingCartTotal$;
  }

}
