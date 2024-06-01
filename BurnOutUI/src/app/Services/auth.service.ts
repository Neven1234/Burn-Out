import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';
import { loginUser } from '../Models/LogInUser';
import { map } from 'rxjs';
import { RegisterUser } from '../Models/RegisterUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  baseUrl=environment.baseUrl
  jwtHelper=new JwtHelperService()
  decodedToken:any;
  LogIn(user:any){
    return this.http.post(this.baseUrl+'api/Auth/Login',user)
    .pipe(
      map((response:any)=>{
        const user=response;
        if(user!= undefined){
          localStorage.setItem('token',user.token)
          this.decodedToken=this.jwtHelper.decodeToken(user.token)
          console.log(this.decodedToken.Role)
        }
      })
    )
  }

  Register(regiserUser:RegisterUser){
    return this.http.post(this.baseUrl+'api/Auth/Register',regiserUser,{responseType: 'text'})
  }
  //// check validation of the token 
  LoggedIn(){
    const token=localStorage.getItem('token')
    return ! this.jwtHelper.isTokenExpired(token)
  }
}
