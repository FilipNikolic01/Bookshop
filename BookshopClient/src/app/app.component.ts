import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from './shopping-cart/shopping-cart.service';
import { AccountService } from './account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Bookshop';

  constructor(
    private shoppingCartService: ShoppingCartService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.loadShoppingCart();
    this.loadCurrentUser();
  }

  loadShoppingCart() {
    const shoppingCartId = localStorage.getItem('shoppingCart_id');
    if (shoppingCartId) {
      this.shoppingCartService.getShoppingCart(shoppingCartId).subscribe({
        next: () => console.log('Initialised shopping cart'),
        error: (error) => console.log(error),
      });
    }
  }

  loadCurrentUser() {
    const token = localStorage.getItem('token');
    this.accountService.loadCurrentUser(token!).subscribe({
      next: () => console.log('Loaded user'),
      error: (error) => console.log(error),
    });
  }
}
