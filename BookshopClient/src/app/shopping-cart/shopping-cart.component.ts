import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICartItem, IShoppingCart } from '../shared/models/shoppingCart';
import { ShoppingCartService } from './shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  shoppingCart$!: Observable<IShoppingCart | null>;

  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.shoppingCart$ = this.shoppingCartService.shoppingCart$;
  }

  incrementItemQuantity(item: ICartItem) {
    this.shoppingCartService.incrementItemQuantity(item);
  }

  decrementItemQuantity(item: ICartItem) {
    this.shoppingCartService.decrementItemQuantity(item);
  }

  removeItemFromShoppingCart(item: ICartItem) {
    this.shoppingCartService.removeItemFromShoppingCart(item);
  }

}
