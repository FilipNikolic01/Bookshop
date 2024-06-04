import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CheckoutService } from '../checkout.service';
import { IDeliveryMethod } from 'src/app/shared/models/deliveryMethod';
import { ShoppingCartService } from 'src/app/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-checkout-delivery',
  templateUrl: './checkout-delivery.component.html',
  styleUrls: ['./checkout-delivery.component.scss']
})
export class CheckoutDeliveryComponent implements OnInit {
  @Input() checkoutForm!: FormGroup;
  deliveryMethods!: IDeliveryMethod[];

  constructor(private checkoutService: CheckoutService, private shoppingCartService: ShoppingCartService) {}

  ngOnInit(): void {
    this.checkoutService.getDeliveryMethods().subscribe({
      next: response => this.deliveryMethods = response,
      error: error => console.log(error)
    });
  }

  setShippingPrice(deliveryMethod: IDeliveryMethod) {
    this.shoppingCartService.setShippingPrice(deliveryMethod)
  }

}
