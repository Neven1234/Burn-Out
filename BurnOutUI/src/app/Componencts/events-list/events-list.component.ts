import { Component, OnInit } from '@angular/core';
import { Event } from '../../Models/Event';
import { EventsService } from '../../Services/events.service';
import { AlertifyService } from '../../Services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrl: './events-list.component.css'
})
export class EventsListComponent implements OnInit {
  events:Event[]=[]
  SearchInput:string=''
  editClicked: boolean = false;
  selectedEvent: Event={
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
    organizerId: '',
    id: 0
  };
  loading:boolean=true
  role:string | null | undefined
  constructor(private eventService:EventsService,private alertify:AlertifyService,private router:Router){}
  ngOnInit(): void {
    this.role=localStorage.getItem('Role')
    if(this.role=='Admin'){
      this.GetAllEventsForAdmin()
    }
    else{
      this.getAllEvents()
    }

   console.log('clicked edite',this.editClicked)
  }
  getAllEvents(){
    this.eventService.GetAllEvents().subscribe({
      next:(respond)=>{
        this.loading=false
        this.events=respond
      },
      error:(error)=>{
        console.log(error)
      }
    })
  }
  GetAllEventsForAdmin(){
    this.eventService.GetAllEventsForAdmin().subscribe({
      next:(response)=>{
        this.loading=false
        this.events=response;
      },
      error:(error)=>{
        console.log(error);
        this.alertify.error(error);
      }
    })
  }
  onApproveClicked(event:Event){
    event.approved=true;
    this.eventService.ApproveEvent(event.id).subscribe({
      next:(resopnse)=>{
        
        this.alertify.success('The Event has been approved successfully')
        if(this.role=='Admin'){
          this.GetAllEventsForAdmin()
          }
        else{
            this.getAllEvents()
          }
      },
      error:(error)=>{
        this.alertify.error('Something went wrong '+error)
      }
    })
  }
  onEditClicked(event: Event) {
    this.selectedEvent = { ...event }; // Clone the event object
    this.editClicked = true;
  }
  onDeleteClicked(event:Event){
    this.alertify.Confirm('Are you sure you want to delete this event?',()=>{
      
      this.eventService.DeleteEvent(event.id).subscribe({
        next:()=>{
          this.eventService.DeletePhoto(event.publicId).subscribe({
            next:()=>{
              console.log('Delete photo from cloudinary')
              this.alertify.success('Event has been deleted ')
              this.getAllEvents()
            },
            error:(error)=>{
              console.log(error)
            }
          })
         
         
          
        },
        error:()=>{
          this.alertify.error('something wrong happend')
        }
      })
    })
  }
  updateEvent(updatedEvent: Event) {
    this.eventService.EditEvent(this.selectedEvent.id,this.selectedEvent).subscribe({
      next:(response)=>{
        this.alertify.success(response.toString())
        this.closeModal()
      },
      error:(error)=>{
        console.log(error)
        this.alertify.error(error)
      }
    })
   
  }
  closeModal() {
    this.editClicked = false;
  }
  Search(){
    if(this.SearchInput!=''){
      this.eventService.EventFilter(this.SearchInput).subscribe({
        next:(response)=>{
          this.events=response;
          if(this.events.length==0){
            this.alertify.message('There is no event with that name')
             this.router.navigate([''])
          }
        },
        error:(error)=>{
          console.log(error)
          this.alertify.error('something went wrong')
          
        }
      })
    }
  }
}
