import { Component, OnInit } from '@angular/core';
import { IBook } from 'src/app/shared/models/book';
import { ShopService } from '../shop.service';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShoppingCartService } from 'src/app/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {
  book!: IBook
  quantity = 1;

  constructor(private shopService: ShopService, private activatedRoute: ActivatedRoute, private breadcrumbService: BreadcrumbService, private shoppingCartService: ShoppingCartService) {
    breadcrumbService.set('@bookDetails', ' ');
  }

  ngOnInit(): void {
    this.getBook(+ this.activatedRoute.snapshot.paramMap.get('id')!);
  }

  getBook(id: number) {
    this.shopService.getBook(id).subscribe({
      next: response => {
        this.book = response;
        this.breadcrumbService.set('@bookDetails', this.book.title);
      },
      error: error => console.log(error)
    });
  }

  addItemToCart() {
    this.shoppingCartService.addItemToCart(this.book, this.quantity)
  }

  incrementQuantity() {
    if(this.quantity < this.book.quantityInStock) {
      this.quantity++;
    }
  }

  decrementQuantity() {
    if(this.quantity > 1) {
      this.quantity--;
    }
  }

}
