import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { apiUrl } from 'src/constants';
import { IWishList, WishList } from '../shared/models/wishList';
import { HttpClient } from '@angular/common/http';
import { IBook } from '../shared/models/book';
import { ICartItem } from '../shared/models/shoppingCart';

@Injectable({
  providedIn: 'root'
})
export class WishListService {
  baseUrl = apiUrl;
  authors: string[] = [];
  private wishListSource = new BehaviorSubject<IWishList | null>(null);
  wishList$ = this.wishListSource.asObservable();

  constructor(private httpClient: HttpClient) { }

  getWishList(id: string) {
    return this.httpClient.get<IWishList>(this.baseUrl + 'wishlist?wishlistId=' + id)
      .pipe(
        map((wishList: IWishList) => {
          this.wishListSource.next(wishList);
        })
      )
  }

  setWishList(wishList: IWishList) {
    return this.httpClient.post<IWishList>(this.baseUrl + 'wishlist', wishList).subscribe({
      next: response => {
        this.wishListSource.next(response)
      },
      error: error => console.log(error)
    })
  }

  getCurrentWishListValue() {
    return this.wishListSource.value;
  }

  addItemToWishList(item: IBook) {
    const itemToAdd: ICartItem = this.mapBookToCartItem(item);
    const wishList = this.getCurrentWishListValue() ?? this.createWishList();
    wishList.items.push(itemToAdd);
    this.setWishList(wishList);
  }

  removeItemFromWishList(item: ICartItem) {
    const wishList = this.getCurrentWishListValue();
    if(wishList!.items.some(x => x.id === item.id)) {
      wishList!.items = wishList!.items.filter(x => x.id !== item.id);
      if(wishList!.items.length > 0) {
        this.setWishList(wishList!);
      } else {
        this.deleteWishList(wishList!);
      }
    }
  }

  deleteWishList(wishList: IWishList) {
    return this.httpClient.delete(this.baseUrl + 'wishlist?wishlistId=' + wishList.id).subscribe({
      next: () => {
        this.wishListSource.next(null);
        localStorage.removeItem('wishList_id');
      },
      error: error => console.log(error)
    });
  }

  private mapBookToCartItem(item: IBook) {
    item.authors.forEach(author => {
      this.authors.push(author.fullName);
    })

    return {
      id: item.id,
      bookTitle: item.title,
      price: item.price,
      quantity: 1,
      pictureURL: item.pictureURL,
      publisher: item.publisher.name,
      author: this.authors
    }
  }

  private createWishList(): IWishList {
    const wishList = new WishList();
    localStorage.setItem('wishList_id', wishList.id);
    return wishList;
  }
}
