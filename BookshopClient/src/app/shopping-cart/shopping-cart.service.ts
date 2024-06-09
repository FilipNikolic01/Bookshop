import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { apiUrl } from 'src/constants';
import { ICartItem, IShoppingCart, IShoppingCartTotals, ShoppingCart } from '../shared/models/shoppingCart';
import { IBook } from '../shared/models/book';
import { IDeliveryMethod } from '../shared/models/deliveryMethod';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  baseUrl = apiUrl;
  authors: string[] = [];
  private shoppingCartSource = new BehaviorSubject<IShoppingCart | null>(null);
  shoppingCart$ = this.shoppingCartSource.asObservable();
  private shoppingCartTotalSource = new BehaviorSubject<IShoppingCartTotals | null>(null);
  shoppingCartTotal$ = this.shoppingCartTotalSource.asObservable();
  shipping = 0;

  constructor(private httpClient: HttpClient) { }

  createPaymentIntent() {
    return this.httpClient.post<any>(this.baseUrl + 'payment/' + this.getCurrentShoppingCartValue()?.id, {})
      .pipe(
        map((shoppingCart: IShoppingCart) => {
          this.shoppingCartSource.next(shoppingCart);
          console.log(this.getCurrentShoppingCartValue());
        })
      );
  }

  getShoppingCart(id: string) {
    return this.httpClient.get<IShoppingCart>(this.baseUrl + 'cart?cartId=' + id)
      .pipe(
        map((shoppingCart: IShoppingCart) => {
          this.shoppingCartSource.next(shoppingCart);
          this.shipping = shoppingCart.shippingPrice!;
          this.calculateTotals();
        })
      );
  }

  setShoppingCart(shoppingCart: IShoppingCart) {
    return this.httpClient.post<IShoppingCart>(this.baseUrl + 'cart', shoppingCart).subscribe({
      next: response => {
        this.shoppingCartSource.next(response);
        this.calculateTotals();
      },
      error: error => console.log(error)
    })
  }

  getCurrentShoppingCartValue() {
    return this.shoppingCartSource.value;
  }

  addItemToCart(item: IBook, quantity = 1) {
    const itemToAdd: ICartItem = this.mapBookToCartItem(item, quantity);
    const shoppingCart = this.getCurrentShoppingCartValue() ?? this.createShoppingCart();
    shoppingCart.items = this.addOrUpdateItem(shoppingCart.items, itemToAdd, quantity);
    this.setShoppingCart(shoppingCart);
  }

  incrementItemQuantity(item: ICartItem) {
    const shoppingCart = this.getCurrentShoppingCartValue();
    const foundItemIndex = shoppingCart!.items.findIndex(x => x.id === item.id);
    shoppingCart!.items[foundItemIndex].quantity++;
    this.setShoppingCart(shoppingCart!);
  }

  decrementItemQuantity(item: ICartItem) {
    const shoppingCart = this.getCurrentShoppingCartValue();
    const foundItemIndex = shoppingCart!.items.findIndex(x => x.id === item.id);
    if(shoppingCart!.items[foundItemIndex].quantity > 1) {
      shoppingCart!.items[foundItemIndex].quantity--;
      this.setShoppingCart(shoppingCart!);
    } else {
      this.removeItemFromShoppingCart(item);
    }
  }

  removeItemFromShoppingCart(item: ICartItem) {
    const shoppingCart = this.getCurrentShoppingCartValue();
    if(shoppingCart!.items.some(x => x.id === item.id)) {
      shoppingCart!.items = shoppingCart!.items.filter(x => x.id !== item.id);
      if(shoppingCart!.items.length > 0) {
        this.setShoppingCart(shoppingCart!);
      } else {
        this.deleteShoppingCart(shoppingCart!);
      }
    }
  }

  deleteShoppingCart(shoppingCart: IShoppingCart) {
    return this.httpClient.delete(this.baseUrl + 'cart?cartId=' + shoppingCart.id).subscribe({
      next: () => {
        this.shoppingCartSource.next(null);
        this.shoppingCartTotalSource.next(null);
        localStorage.removeItem('shoppingCart_id');
      },
      error: error => console.log(error)
    });
  }

  setShippingPrice(deliveryMethod: IDeliveryMethod) {
    this.shipping = deliveryMethod.price;
    const shoppingCart = this.getCurrentShoppingCartValue();
    shoppingCart!.deliveryMethodId = deliveryMethod.id;
    shoppingCart!.shippingPrice = deliveryMethod.price;
    this.calculateTotals();
    this.setShoppingCart(shoppingCart!);
  }

  private mapBookToCartItem(item: IBook, quantity: number) {
    item.authors.forEach(author => {
      this.authors.push(author.fullName);
    })

    return {
      id: item.id,
      bookTitle: item.title,
      price: item.price,
      quantity,
      pictureURL: item.pictureURL,
      publisher: item.publisher.name,
      author: this.authors
    };
  }

  private createShoppingCart(): IShoppingCart {
    const shoppingCart = new ShoppingCart();
    localStorage.setItem('shoppingCart_id', shoppingCart.id);
    return shoppingCart;
  }

  private addOrUpdateItem(items: ICartItem[], itemToAdd: ICartItem, quantity: number): ICartItem[] {
    const index = items.findIndex(i => i.id === itemToAdd.id);
    if(index === -1) {
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    } else {
      items[index].quantity += quantity;
    }
    return items;
  }

  private calculateTotals() {
    const shoppingCart = this.getCurrentShoppingCartValue();
    const shipping = this.shipping;
    let subtotal = 0;
    shoppingCart?.items.forEach(item => {
      subtotal += item.price * item.quantity
    });
    const total = subtotal + shipping;
    this.shoppingCartTotalSource.next({shipping, subtotal, total})
  }
}
