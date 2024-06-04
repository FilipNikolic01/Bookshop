import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ICartItem, IShoppingCart } from '../../models/shoppingCart';
import { ShoppingCartService } from 'src/app/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.scss']
})
export class ShoppingCartSummaryComponent implements OnInit {
  shoppingCart$!: Observable<IShoppingCart | null>
  @Output() decrement: EventEmitter<ICartItem> = new EventEmitter<ICartItem>();
  @Output() increment: EventEmitter<ICartItem> = new EventEmitter<ICartItem>();
  @Output() remove: EventEmitter<ICartItem> = new EventEmitter<ICartItem>();
  @Input() isShoppingCart = true;

  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.shoppingCart$ = this.shoppingCartService.shoppingCart$
  }

  decrementItemQuantity(item: ICartItem) {
    this.decrement.emit(item);
  }

  incrementItemQuantity(item: ICartItem) {
    this.increment.emit(item);
  }

  removeItemFromShoppingCart(item: ICartItem) {
    this.remove.emit(item);
  }

}
