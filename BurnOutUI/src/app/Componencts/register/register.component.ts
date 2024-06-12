import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterUser } from '../../Models/RegisterUser';
import { AuthService } from '../../Services/auth.service';
import { AlertifyService } from '../../Services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  IsRacer:boolean=false
  user:RegisterUser={
    username: '',
    password: '',
    phoneNumber:'',
    email: '',
    gender: '',
    age: 0,
    userID: 0,
    userRole: ''
  }
  loading:boolean=false
  constructor(private router:Router,private fb:FormBuilder,private auth:AuthService,private alerty:AlertifyService){}
  ngOnInit(): void {
    this.createRegisterForm()
  
  }


  Cancel(){
    this.router.navigate(["Login"])
  }
  register(){
    if(this.registerForm.valid){
      this.user.username=this.registerForm.get("username")?.value
      this.user.age=this.registerForm.get("age")?.value
      this.user.userRole=this.registerForm.get("Role")?.value
      this.user.gender=this.registerForm.get("gender")?.value
      this.user.password=this.registerForm.get("password")?.value
      this.user.email=this.registerForm.get("email")?.value
      this.user.userID=this.registerForm.get("userID")?.value
      this.user.carType=this.registerForm.get("carType")?.value
      this.user.license=this.registerForm.get("License")?.value
      this.loading=true
      this.auth.Register(this.user).subscribe({
        next:()=>{
          this.loading=false
          this.alerty.success("account created successfullly")
          this.router.navigate(['Login'])
        },
        error:(error)=>{
          this.loading=false
          this.alerty.error(error)
          console.log(error)
        }
      })
    }
    else{
      console.log("not valid")
    }
  }
   //register forem
   createRegisterForm(){
    this.registerForm= this.fb.group({
      gender:['male'],
      Role:['Audience'],
      username:['',Validators.required],
      email:['',Validators.required],
      phoneNumber:['',Validators.required],
      age:['',Validators.required],
      userID:['',Validators.required],
      carType:[''],
      License:[''],
      password:['', [Validators.required, Validators.minLength(6), this.passwordValidator()]],
      confirmPassword:['',Validators.required]
    },{validator:this.passwordMatchValidator})
      // Watch for changes on the Role control
    this.registerForm.get('Role')?.valueChanges.subscribe(role => {
      this.updateRacerValidators(role);
    });
  }
  updateRacerValidators(role: string) {
    const carTypeControl = this.registerForm.get('carType');
    const licenseControl = this.registerForm.get('License');
  
    if (role === 'Racer') {
      carTypeControl?.setValidators([Validators.required]);
      licenseControl?.setValidators([Validators.required]);
    } else {
      carTypeControl?.clearValidators();
      licenseControl?.clearValidators();
    }
  
    carTypeControl?.updateValueAndValidity();
    licenseControl?.updateValueAndValidity();
  }
  passwordMatchValidator(g:AbstractControl){
    return g.get('password')?.value===g.get('confirmPassword')?.value ? null:{'mismatch':true}
  }
  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (!value) {
        return null; // return null if control is empty, validation is handled by required validator
      }
  
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumeric = /[0-9]/.test(value);
      const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
  
      const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecial;
  
      return !passwordValid ? { 'passwordStrength': true } : null;
    };
  }

  CheckRacer(event: any){
    const role = event.target.value;
  this.updateRacerValidators(role);
  this.IsRacer = role === 'Racer';
  }

}
