import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit  {

  loginForm!: FormGroup;
  constructor(private fb:FormBuilder){}

  ngOnInit(): void {
   this.createLoginForm()
  }

    //register forem
    createLoginForm(){
      this.loginForm= this.fb.group({
        username:['',Validators.required],
        password:['', [Validators.required]],
      })
    }

}
