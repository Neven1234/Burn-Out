import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './Services/auth.service';
import { AlertifyService } from './Services/alertify.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const userService=inject(AuthService)
  const router=inject(Router)
  const alertify=inject(AlertifyService)
  if(userService.LoggedIn())
  {
    return true
  }
  else{
    alertify.error('please login first')
    router.navigate(['Login'])
    return false
  }
};
