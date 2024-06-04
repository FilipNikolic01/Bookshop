import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { apiUrl } from 'src/constants';
import { IDeliveryMethod } from '../shared/models/deliveryMethod';
import { IOrderToCreate } from '../shared/models/order';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  baseUrl = apiUrl;

  constructor(private httpClient: HttpClient) { }

  getDeliveryMethods() {
    return this.httpClient.get<IDeliveryMethod[]>(this.baseUrl + 'orders/deliveryMethods').pipe(
      map((deliveryMethod: IDeliveryMethod[]) => {
        return deliveryMethod.sort((a, b) => b.price - a.price);
      })
    )
  }

  createOrder(orderToCreate: IOrderToCreate) {
    return this.httpClient.post<IOrderToCreate>(apiUrl + 'orders', orderToCreate);
  }
}
