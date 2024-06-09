import { CdkStepper } from '@angular/cdk/stepper';
import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ShoppingCartService } from 'src/app/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrls: ['./checkout-review.component.scss']
})
export class CheckoutReviewComponent implements OnInit {
  @Input() appStepper!: CdkStepper;

  constructor(private shoppingCartService: ShoppingCartService, private toastr: ToastrService) {}

  ngOnInit(): void {
    
  }

  createPaymentIntent() {
    return this.shoppingCartService.createPaymentIntent().subscribe({
      next: () => this.appStepper.next(),
      error: error => console.log(error)
    })
  }

}
