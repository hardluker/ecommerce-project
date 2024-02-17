import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ShopFormService } from '../../services/shop-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  checkoutFormGroup!: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  //Injecting formbuilder and shopFormService
  constructor(
    private formBuilder: FormBuilder,
    private shopFormService: ShopFormService
  ) {}

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: [''],
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        zipCode: [''],
        country: [''],
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        zipCode: [''],
        country: [''],
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: [''],
      }),
    });

    // Populate credit card months. The months are zero-based
    const startMonth: number = new Date().getMonth() + 1;
    console.log('Start Month' + startMonth);

    this.shopFormService.getCreditCardMonths(startMonth).subscribe((data) => {
      console.log('Retreived credit card months: ' + JSON.stringify(data));
      this.creditCardMonths = data;
    });

    // Populate credit card years
    this.shopFormService.getCreditCardYears().subscribe((data) => {
      console.log('Retrieved Credit CardYears: ' + JSON.stringify(data));
      this.creditCardYears = data;
    });
  }

  onSubmit() {
    console.log('Handle the submit button');
    console.log(this.checkoutFormGroup.get('customer')?.value); // have to use the safe navigation operator.
  }

  copyShippingAddressToBillingAddress(event: Event) {
    const target = event.target as HTMLInputElement; //I had to clarify this to ensure the compiler will accept it as HTMLInputElement
    if (target.checked) {
      this.checkoutFormGroup.controls['billingAddress'].setValue(
        this.checkoutFormGroup.controls['shippingAddress'].value
      );
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
    }
  }

  handleMonthsAndYears() {
    //Accessing the credit card form
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    //initializing current year and selected year
    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(
      creditCardFormGroup?.value.expirationYear
    );

    //Months field is dependent on year.
    let startMonth: number;

    //If the selected year is the current year, display remaining months
    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    }

    //Else, start from the first of the year
    else {
      startMonth = 1;
    }

    //Update the month dropdown data.
    this.shopFormService.getCreditCardMonths(startMonth).subscribe((data) => {
      console.log('Retreived credit card months: ' + JSON.stringify(data));
      this.creditCardMonths = data;
    });
  }
}
