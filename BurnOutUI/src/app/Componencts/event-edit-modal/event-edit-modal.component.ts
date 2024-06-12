import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Event } from '../../Models/Event';

@Component({
  selector: 'app-event-edit-modal',
  templateUrl: './event-edit-modal.component.html',
  styleUrl: './event-edit-modal.component.css'
})
export class EventEditModalComponent implements OnInit {
  dateToShow:string=''
  ngOnInit(): void {
    console.log('dialog must oben')
    console.log(this.event.date)
    if (this.event.date) {
     this.dateToShow = new Date(this.event.date).toISOString().substring(0, 10);
    }
  }

  @Input() event:Event={
    eventName: '',
    photoUrl: '',
    publicId:'',
    organzerName: '',
    description: '',
    approved:false,
    place: '',
    date: new Date(),
    audiencePrice: 0,
    racerPrice: 0,
    reciersCount: 0,
    audianceCount: 0,
    organizerId: '',
    id: 0
  };
  @Output() saveChanges = new EventEmitter<Event>();
  @Output() close = new EventEmitter<void>();

  onSubmit(form: { valid: any; }) {
    if (form.valid) {
      this.event.date=new Date(this.dateToShow)
      this.saveChanges.emit(this.event);
    }
  }

  closeModal() {
    this.close.emit();
  }
}
