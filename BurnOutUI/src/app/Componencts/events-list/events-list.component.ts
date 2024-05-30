import { Component, OnInit } from '@angular/core';
import { Event } from '../../Models/Event';
import { EventsService } from '../../Services/events.service';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrl: './events-list.component.css'
})
export class EventsListComponent implements OnInit {
  events:Event[]=[]
  constructor(private eventService:EventsService){}
  ngOnInit(): void {
   this.getAllEvents()
  }
  getAllEvents(){
    this.eventService.GetAllEvents().subscribe({
      next:(respond)=>{
        this.events=respond
      },
      error:(error)=>{
        console.log(error)
      }
    })
  }
}
