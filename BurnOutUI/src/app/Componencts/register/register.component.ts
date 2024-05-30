import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  constructor(private router:Router,private fb:FormBuilder){}
  ngOnInit(): void {
    this.createREgisterForm()
  }

   //register forem
   createREgisterForm(){
    this.registerForm= this.fb.group({
      gender:['male'],
      username:['',Validators.required],
      email:['',Validators.required],
      age:['',Validators.required],
      password:['', [Validators.required,Validators.minLength(6)]],
      confirmPassword:['',Validators.required]
    },{validator:this.passwordMatchValidator})
  }
  passwordMatchValidator(g:AbstractControl){
    return g.get('password')?.value===g.get('confirmPassword')?.value ? null:{'mismatch':true}
  }
  Cancel(){
    this.router.navigate(["Login"])
  }
}
