import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { AlertifyService } from '../../Services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit{
  @Input() name:string | undefined |any
  organizer:boolean=false
  loggedIn:boolean=false
 
  constructor(private auth:AuthService,private alert:AlertifyService,private router:Router){}
  ngOnInit(): void {
    this.name=this.auth.decodedToken.name;
    if(this.auth.LoggedIn()){
      this.name=localStorage.getItem('name')
      console.log('name',localStorage.getItem('name'))
      this.loggedIn=true;
    }
    else {
      this.loggedIn=false
    }
  }
  isOrganizer(){
    if(localStorage.getItem('Role')=="Organizer" && this.LoggedIn()){
      return true
    }
    return false
  }
  LoggedIn(){
    return this.auth.LoggedIn()
  }
  LogOut(){
    this.loggedIn=false
    this.alert.success("you signed out")
    this.router.navigate([''])
    localStorage.clear()
  }
  
}
