import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Event } from '../../Models/Event';
import { PaymentService } from '../../Services/payment.service';
import { FawryPaymentRequest } from '../../Models/FawryPaymentRequest ';
import { AuthService } from '../../Services/auth.service';

import { AlertifyService } from '../../Services/alertify.service';
import { Router } from '@angular/router';
import { EventsService } from '../../Services/events.service';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.css'
})
export class EventCardComponent implements OnInit {
  @Output() editClicked = new EventEmitter<Event>();
  @Output()deleteClicked=new EventEmitter<Event>();
  @Output()approveClicked=new EventEmitter<Event>();
  @Input ()event:Event={
    eventName: '',
    photoUrl: '',
    publicId:'',
    description: '',
    place: '',
    date: new Date(),
    approved:false,
    reciersCount: 0,
    audianceCount: 0,
    organzerName: '',
    audiencePrice: 0,
    racerPrice: 0,
    organizerId: '',
    id: 0
  }
  clicked:boolean=false
 
  constructor(private auth:AuthService,private router:Router,private alert:AlertifyService,private eventService:EventsService){}
  role:any;
  racer:boolean=false
  Organizer:boolean=false
  Admin:boolean=false
  Authorized:boolean=false
  
  ngOnInit(): void {
    this.role= localStorage.getItem("Role")
    if(this.role=='Organizer'){
      this.Organizer=true
      if(this.event.organizerId==localStorage.getItem('userId')){
        this.Authorized=true
      }
    }
    else if(this.role=='Admin'){
      this.Admin=true;
    }
  }
  detailsClick(){
    if(this.auth.LoggedIn()){
      
      if(this.role=='Racer')
      {
        console.log(true)
        this.racer=true
      }
      else{
        this.racer=false
      }

    }
    else{
      this.alert.message("Login first")
      this.router.navigate(['Login'])
    }
     this.clicked=true
  }
 lessClicked(){
  this.clicked=false
 }
 pay(){
  this.router.navigate(['Pay'])
 }
 edit() {
  this.editClicked.emit(this.event);
}
delete(){
  this.deleteClicked.emit(this.event);
}
approve(){
  this.approveClicked.emit(this.event);
}
}
