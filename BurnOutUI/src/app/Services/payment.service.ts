import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FawryPaymentRequest } from '../Models/FawryPaymentRequest ';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Payment } from '../Models/Payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  baseUrl=environment.baseUrl
  constructor(private http:HttpClient) { }
  initiateFawryPayment(payment:Payment){
    return this.http.post(this.baseUrl+'api/Payment',payment,{responseType: 'text'})
  }
}
