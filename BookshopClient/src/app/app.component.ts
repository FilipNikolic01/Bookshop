import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from './shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Bookshop';

  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {
    const shoppingCartId = localStorage.getItem('shoppingCart_id');
    if(shoppingCartId) {
      this.shoppingCartService.getShoppingCart(shoppingCartId).subscribe({
        next: () => console.log('Initialised shopping cart'),
        error: error => console.log(error)
      });
    }
  }
}
