import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiUrl } from 'src/constants';
import { IOrder } from '../shared/models/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  baseUrl = apiUrl;

  constructor(private httpClient: HttpClient) { }

  getOrdersForUser() {
    return this.httpClient.get<IOrder[]>(this.baseUrl + 'orders');
  }

  getOrderDetailed(id: number) {
    return this.httpClient.get<IOrder>(this.baseUrl + 'orders/' + id);
  }
}
