import { Component, Input, OnInit } from '@angular/core';
import { Event } from '../../Models/Event';
import { PaymentService } from '../../Services/payment.service';
import { FawryPaymentRequest } from '../../Models/FawryPaymentRequest ';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent implements OnInit {

  @Input ()event:Event={
    eventName: '',
    photoUrl: '',
    description: '',
    place: '',
    date:new Date(),
    reciersCount: 0,
    audianceCount: 0
  }
 
  constructor(){}
  ngOnInit(): void {
    console.log(this.event.description)
  }
 
}
