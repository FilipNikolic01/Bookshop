import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { IShoppingCart } from 'src/app/shared/models/shoppingCart';
import { IUser } from 'src/app/shared/models/user';
import { IWishList } from 'src/app/shared/models/wishList';
import { ShoppingCartService } from 'src/app/shopping-cart/shopping-cart.service';
import { WishListService } from 'src/app/wish-list/wish-list.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  shoppingCart$!: Observable<IShoppingCart | null>;
  wishList$!: Observable<IWishList | null>;
  currentUser$!: Observable<IUser | null>;
  localStorage = localStorage;

  constructor(private shoppingCartService: ShoppingCartService,
              private wishListService: WishListService,
              private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.shoppingCart$ = this.shoppingCartService.shoppingCart$;
    this.wishList$ = this.wishListService.wishList$;
    this.currentUser$ = this.accountService.currentUser$;
  }

  logout() {
    this.accountService.logout();
  }

}
