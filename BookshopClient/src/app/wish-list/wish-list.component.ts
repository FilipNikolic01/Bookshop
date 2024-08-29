import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IWishList } from '../shared/models/wishList';
import { WishListService } from './wish-list.service';
import { ICartItem } from '../shared/models/shoppingCart';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent implements OnInit {
  wishList$!: Observable<IWishList | null>;

  constructor(private wishListService: WishListService, private shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.wishList$ = this.wishListService.wishList$;
  }

  removeItemFromWishList(item: ICartItem) {
    this.wishListService.removeItemFromWishList(item);
  }

  addItemToCart(item: ICartItem) {
    this.shoppingCartService.addItemToCart(item);
  }
}
