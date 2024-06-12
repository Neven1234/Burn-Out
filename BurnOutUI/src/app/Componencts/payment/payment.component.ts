import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Stripe, StripeCardCvcElement, StripeCardElement, StripeCardExpiryElement, StripeCardNumberElement, loadStripe } from '@stripe/stripe-js';
import { PaymentService } from '../../Services/payment.service';
import { Payment } from '../../Models/Payment';
import { AlertifyService } from '../../Services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from '../../Models/Event';
import { EventsService } from '../../Services/events.service';

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
    amount: 0,
    currency: 'egp'
  }
  event:Event={
    id: 0,
    eventName: '',
    photoUrl: '',
    publicId:'',
    approved:false,
    organzerName: '',
    description: '',
    place: '',
    date: new Date,
    audiencePrice: 0,
    racerPrice: 0,
    reciersCount: 0,
    audianceCount: 0,
    organizerId: ''
  }
  constructor(private paymentService:PaymentService,private eventService:EventsService,
    private alert:AlertifyService,private router:Router,private route:ActivatedRoute) {}
  ngOnInit(): void {
    const role=localStorage.getItem('Role')
    this.route.paramMap.subscribe({
      next:(params)=>{
        const id=Number(params.get('id'))
        if(id){
          this.eventService.GetEventById(id).subscribe({
            next:(response)=>{
              this.event=response
              if(role=='Racer'){
                this.payment.amount=this.event.racerPrice
              }
              else{
                this.payment.amount=this.event.audiencePrice
              }
            }
          })
        }
      }
    })
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
        this.eventService.UpdateRacerOrAudincList(this.event).subscribe({
          next:(response)=>{
            this.alert.success(response)
          },
          error:(error)=>{
            this.alert.error(error)
          }
        })
      },
      error:(error)=>{
        this.isProcessing = false;
        console.error('Error creating payment intent:', error);
        this.alert.error('Failed to create payment intent. Please try again.')
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
      this.alert.error('payment failed: '+error.message)
      this.isProcessing=false
      this.errorMessage=error.message
    } else if (paymentIntent) {
      // Payment succeeded
      console.log('Payment succeeded:', paymentIntent);
      this.alert.success('Payment succeeded')
      this.isProcessing=false
      this.router.navigate([''])
    }
  }

}


