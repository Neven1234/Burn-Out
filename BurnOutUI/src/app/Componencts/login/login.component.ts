import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { loginUser } from '../../Models/LogInUser';
import { AuthService } from '../../Services/auth.service';
import { User } from '../../Models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit  {

  loginForm!: FormGroup;
  constructor(private fb:FormBuilder,private auth:AuthService){}
  user:User={
    username: '',
    password: ''
  }
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

    Login(){
      if(this.loginForm.valid){
        this.user.username=this.loginForm.get('username')?.value
        this.user.password=this.loginForm.get('password')?.value
        this.auth.LogIn(this.user).subscribe({
          next:(response)=>{
            console.log('Loged in')
          },
          error:(error)=>{
            console.log(error)
          }
        })
      }
      
    }
}
