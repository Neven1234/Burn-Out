import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { loginUser } from '../../Models/LogInUser';
import { AuthService } from '../../Services/auth.service';
import { User } from '../../Models/user';
import { AlertifyService } from '../../Services/alertify.service';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit  {

  loginForm!: FormGroup;
  loading:boolean =false;
  constructor(private fb:FormBuilder,private auth:AuthService,private alerty:AlertifyService,
    private router:Router, private app:AppComponent){}
  user:User={
    username: '',
    password: ''
  }
  ngOnInit(): void {
   this.createLoginForm()
  }

    //Login forem
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
        this.loading=true
        this.auth.LogIn(this.user).subscribe({
          next:(response)=>{
            this.loading=false
            console.log('Loged in')
            this.app.name=this.auth.decodedToken.name
            this.alerty.success("Logged in sucessfully")
            this.router.navigate([''])
          },
          error:(error)=>{
           
            this.alerty.error('Username Or Password Are wrong')
            this.loading=false
          }
        })
      }
      
    }
}
