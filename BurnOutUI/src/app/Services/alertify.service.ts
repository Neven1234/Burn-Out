import { Injectable } from '@angular/core';
import * as alertifyjs from 'alertifyjs'
@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }
    //confirm
  Confirm(message:string,OkCallBack:()=>any){
    alertifyjs.confirm(message,(e:any)=>{
      if(e){
        OkCallBack()
      }
      else{}
    })
  }
  //Success alert
  success(message:string){
    alertifyjs.success(message);
  }
   //Error alert
   error(message:string){
    alertifyjs.error(message);
  }
   //worrning alert
   worrning(message:string){
    alertifyjs.warning(message);
  }
   //Success alert
   message(message:string){
    alertifyjs.message(message);
  }
}
