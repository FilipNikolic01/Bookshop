import { Component, Input } from '@angular/core';
import { IBook } from 'src/app/shared/models/book';
import { ShoppingCartService } from 'src/app/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent {
  @Input() book!: IBook;

  constructor(private shoppingCartService: ShoppingCartService) {}

  addItemToCart() {
    this.shoppingCartService.addItemToCart(this.book);
  }
}
