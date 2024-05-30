import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../Models/Event';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private http:HttpClient) { }
  baseUrl=environment.baseUrl
  public GetAllEvents():Observable<Event[]>{
    return this.http.get<Event[]>(this.baseUrl+'api/Events')
  }
}
