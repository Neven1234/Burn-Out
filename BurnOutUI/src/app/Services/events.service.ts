import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../Models/Event';
import { environment } from '../../environments/environment';
import { photo } from '../Models/Photo';
import { NewEvent } from '../Models/EventToCreate';


@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http:HttpClient) { }
  baseUrl=environment.baseUrl
  public GetAllEvents():Observable<Event[]>{
    return this.http.get<Event[]>(this.baseUrl+'api/Events')
  }
  public GetAllEventsForAdmin():Observable<Event[]>{
    return this.http.get<Event[]>(this.baseUrl+'api/Events/Admin-View')
  }
  public EditEvent(id:number,updatedEvent:Event){
    return this.http.put(this.baseUrl+'api/Events/'+id,updatedEvent,{responseType: 'text'})
  }
  public DeleteEvent(id:number){
    return this.http.delete(this.baseUrl+'api/Events/'+id,{responseType: 'text'})
  }
  public ApproveEvent(id:number){
    return this.http.put(this.baseUrl+'api/Events/Approve/'+id,{},{responseType: 'text'})
  }

  public UploadEventPhoto(photo:photo):Observable<photo>{
    const formData = new FormData();
    formData.append('file', photo.file);
    formData.append('photoUrl', photo.photoUrl);
    formData.append('publicId', photo.publicId);
    return this.http.post<photo>(this.baseUrl+'api/Photo',formData)
  }
  public DeletePhoto(publicId:string){
    return this.http.delete(this.baseUrl+'api/Photo/'+publicId)
  }
  public AddEvent(newEvent:NewEvent){
    return this.http.post(this.baseUrl+'api/Events',newEvent,{responseType: 'text'})
  }
  public GetEventById(id:number):Observable<Event>{
    return this.http.get<Event>(this.baseUrl+'api/Events/'+id)
  }
  public UpdateRacerOrAudincList(theEvent :Event){
    return this.http.post(this.baseUrl+'api/Events/Update-Event-List',theEvent,{responseType: 'text'})
  }
  public EventFilter(eventName:string):Observable<Event[]>{
    return this.http.get<Event[]>(this.baseUrl+'api/Events/Event-Filter/'+eventName)
  }
}
