import { Component, Input, OnInit } from '@angular/core';
import { Event } from '../../Models/Event';

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
