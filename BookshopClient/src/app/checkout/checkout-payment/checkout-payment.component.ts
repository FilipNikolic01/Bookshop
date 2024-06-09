import { Component, ElementRef, Input, OnInit, ViewChild, } from '@angular/core';
import { ShoppingCartService } from 'src/app/shopping-cart/shopping-cart.service';
import { CheckoutService } from '../checkout.service';
import { ToastrService } from 'ngx-toastr';
import { NavigationExtras, Router } from '@angular/router';
import { IShoppingCart } from 'src/app/shared/models/shoppingCart';
import { FormGroup } from '@angular/forms';
import { loadStripe } from '@stripe/stripe-js';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent implements OnInit {
  @Input() checkoutForm!: FormGroup;
  @ViewChild('cardNumber', {static: true}) cardNumberElement!: ElementRef;
  @ViewChild('cardExpiry', {static: true}) cardExpiryElement!: ElementRef;
  @ViewChild('cardCvc', {static: true}) cardCvcElement!: ElementRef;
  stripe: any;
  cardNumber: any;
  cardExpiry: any;
  cardCvc: any;
  cardNumberComplete = false;
  cardExpiryComplete = false;
  cardCvcComplete = false;
  cardErrors: any;
  loading = false;

  constructor(private shoppingCartService: ShoppingCartService, private checkoutService: CheckoutService,
              private toastr: ToastrService, private router: Router) {}

  ngOnInit(): void {
    loadStripe('pk_test_51POGAMLj5bm6aVXKuCtCcsmnC865di023elKnLlTv7kkSXN0wgcLLaKuQ7NBeIcDIs4elNVIwlkDS5A9mLqCIZeT00adrQVcFu').then(stripe => {
      this.stripe = stripe;
      const elements = stripe?.elements();
      if (elements) {
        this.cardNumber = elements.create('cardNumber');
        this.cardNumber.mount(this.cardNumberElement.nativeElement);
        this.cardNumber.on('change', (event: any) => {
          this.cardNumberComplete = event.complete;
          if(event.error)
            this.cardErrors = event.error.message;
          else
            this.cardErrors = null;
        })

        this.cardExpiry = elements.create('cardExpiry');
        this.cardExpiry.mount(this.cardExpiryElement.nativeElement);
        this.cardExpiry.on('change', (event: any) => {
          this.cardExpiryComplete = event.complete;
          if(event.error)
            this.cardErrors = event.error.message;
          else
            this.cardErrors = null;
        })

        this.cardCvc = elements.create('cardCvc');
        this.cardCvc.mount(this.cardCvcElement.nativeElement);
        this.cardCvc.on('change', (event: any) => {
          this.cardCvcComplete = event.complete;
          if(event.error)
            this.cardErrors = event.error.message;
          else 
            this.cardErrors = null;
        })
      }
    })
  }

  async submitOrder() {
    this.loading = true;
    const shoppingCart = this.shoppingCartService.getCurrentShoppingCartValue();
    try {
      const createdOrder = await this.createOrder(shoppingCart!);
      const paymentResult = await this.confirmPaymentWithStripe(shoppingCart!);

      if(paymentResult.paymentIntent) {
        this.shoppingCartService.deleteShoppingCart(shoppingCart!);
        const navigationExtras: NavigationExtras = {state: createdOrder};
        this.router.navigate(['checkout/success'], navigationExtras);
      } else {
        this.toastr.error('Neuspešno plaćanje. ' + paymentResult.error.message);
      }
      this.loading = false;
    } catch (error) {
      console.log(error);
      this.loading = false;
    }
  }

  private getOrderToCreate(shoppingCart: IShoppingCart) {
    return {
      shoppingCartId: shoppingCart.id,
      deliveryMethodId: this.checkoutForm.get('deliveryForm')?.get('deliveryMethod')?.value,
      orderAddress: this.checkoutForm.get('addressForm')?.value
    }
  }

  private async createOrder(shoppingCart: IShoppingCart) {
    const orderToCreate = this.getOrderToCreate(shoppingCart!);
    return firstValueFrom(this.checkoutService.createOrder(orderToCreate));
  }

  private async confirmPaymentWithStripe(shoppingCart: IShoppingCart) {
    return this.stripe.confirmCardPayment(shoppingCart?.clientSecret, {
      payment_method: {
        card: this.cardNumber,
        billing_details: {
          name: this.checkoutForm.get('paymentForm')?.get('nameOnCard')?.value
        }
      }
    });
  }
}
