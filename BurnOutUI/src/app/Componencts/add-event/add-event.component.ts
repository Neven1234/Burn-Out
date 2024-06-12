import { Component } from '@angular/core';
import { Event } from '../../Models/Event';
import { NewEvent } from '../../Models/EventToCreate';
import { EventsService } from '../../Services/events.service';
import { photo } from '../../Models/Photo';
import { AlertifyService } from '../../Services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.css'
})
export class AddEventComponent {
  event:NewEvent={
    eventName: '',
    photoUrl: '',
    description: '',
    place: '',
    date: new Date,
    audiencePrice: 0,
    racerPrice: 0,
    publicId: ''
  }
  dateToShow:string=''
  imageUrl:string=''
  fileToUpload:any
  selectedImage=false
  photoUploaded: photo | undefined;
  loading:boolean=false
  constructor(private eventService:EventsService,private alertify:AlertifyService,private router:Router){}
  //upload image
  handelDileInput(file:FileList){
    this.fileToUpload=file.item(0)
    var reader=new FileReader();
    reader.onload=(event:any)=>{
      this.event.photoUrl=event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
    console.log('img ', this.event.photoUrl)
    console.log('esm el soraaa: '+ this.fileToUpload)
  }

  onSubmit(Image: any){
    this.loading=true
   const  photoUploaded:photo={
      photoUrl: '',
      publicId: '',
      file: this.fileToUpload
    }
     this.eventService.UploadEventPhoto(photoUploaded).subscribe({
      next:(response)=>{
        this.photoUploaded=response
        this.event.photoUrl=this.photoUploaded.photoUrl
        this.event.publicId=this.photoUploaded.publicId
        this.event.date=new Date(this.dateToShow)
        this.eventService.AddEvent(this.event).subscribe({
          next:(response)=>{
            this.loading=false
            this.alertify.success('Your  New Event Was Sent to the Admin successfully ')
            this.alertify.message('Your event will be visible to the public when approved by our admin')
            this.router.navigate([''])
          },
          error:(error)=>{
            this.alertify.error(error)
          }
        })
      },
      error:(error)=>{
        this.alertify.error(error);
      }
    })
     
  }
  Back(){
    this.router.navigate([''])
  }
  cancel(){
    this.selectedImage=false
  }
  slected(){
    this.selectedImage=true
  }
}
