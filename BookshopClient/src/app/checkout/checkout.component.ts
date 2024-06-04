import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account/account.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  checkoutForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private accountService: AccountService) {}

  ngOnInit(): void {
    this.createCheckoutForm();
    this.getAddressFormValues();
  }

  createCheckoutForm() {
    this.checkoutForm = this.formBuilder.group({
      addressForm: this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        postalCode: ['', Validators.required]
      }),
      deliveryForm: this.formBuilder.group({
        deliveryMethod: ['', Validators.required]
      }),
      paymentForm: this.formBuilder.group({
        nameOnCard: ['', Validators.required]
      })
    });
  }

  getAddressFormValues() {
    this.accountService.getUserAddress().subscribe({
      next: address => address && this.checkoutForm.get('addressForm')?.patchValue(address),
      error: error => console.log(error)
    });
  }

}
