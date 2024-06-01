import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Stripe, StripeCardCvcElement, StripeCardElement, StripeCardExpiryElement, StripeCardNumberElement, loadStripe } from '@stripe/stripe-js';
import { PaymentService } from '../../Services/payment.service';
import { Payment } from '../../Models/Payment';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {
  stripe: Stripe | null = null;
  @ViewChild('paymentForm') paymentForm: ElementRef | undefined;
  cardElement: StripeCardElement | null = null;
  isProcessing: boolean = false;
  errorMessage: string | undefined;
  cardNumberElement: StripeCardNumberElement | null = null;
  cardExpiryElement: StripeCardExpiryElement | null = null;
  cardCvcElement: StripeCardCvcElement | null = null;
  zipCode: string = '';
  payment:Payment={
    amount: 1000,
    currency: 'usd'
  }
  constructor(private paymentService:PaymentService) {}
  ngOnInit(): void {
    this.loadStripe();
  }
  async loadStripe() {
    this.stripe = await loadStripe('pk_test_51PMh6JANVPJsaz076P00QNHpgLIuz2awzG9L0hZntPQlY195Eb1e8ar6jpbDeAYg76XUsxQZbrwnR2z1pDhd6KO400yAzB3lNU');
    if (this.stripe) {
      const elements = this.stripe.elements();
      this.cardNumberElement = elements.create('cardNumber');
      this.cardNumberElement.mount('#card-number-element');

      this.cardExpiryElement = elements.create('cardExpiry');
      this.cardExpiryElement.mount('#card-expiry-element');

      this.cardCvcElement = elements.create('cardCvc');
      this.cardCvcElement.mount('#card-cvc-element');
    }
  }
  processPayment() {
    this.isProcessing = true;
    this.errorMessage = '';
    this.paymentService.initiateFawryPayment(this.payment).subscribe({
      next:async (response)=>{
        this.confirmPayment(response);
      },
      error:(error)=>{
        this.isProcessing = false;
        console.error('Error creating payment intent:', error);
        this.errorMessage = 'Failed to create payment intent. Please try again.';
      }
    })
  }

  async confirmPayment(clientSecret: string) {
    if (!this.stripe || !this.cardNumberElement || !this.cardExpiryElement || !this.cardCvcElement) {
      console.error('Stripe.js or card element has not been loaded properly.');
      return;
    }

    const { error, paymentIntent } = await this.stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: this.cardNumberElement,
        billing_details: {
          name: 'Customer Name', // Replace with customer's name
          address: {
            postal_code: this.zipCode // Include the ZIP code
          }
        }
      }
    });

    if (error) {
      // Handle payment failure
      console.error('Payment failed:', error.message);
      this.errorMessage=error.message
    } else if (paymentIntent) {
      // Payment succeeded
      console.log('Payment succeeded:', paymentIntent);
      alert('Payment succeeded!');
    }
  }

}


