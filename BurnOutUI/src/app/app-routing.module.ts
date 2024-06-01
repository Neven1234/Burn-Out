import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Componencts/login/login.component';
import { RegisterComponent } from './Componencts/register/register.component';
import { EventsListComponent } from './Componencts/events-list/events-list.component';
import { PaymentComponent } from './Componencts/payment/payment.component';

const routes: Routes = [
  {
    path:'Login',
    component:LoginComponent
  },
  {
    path:'Register',
    component:RegisterComponent
  },
  {
    path:'',
    component:EventsListComponent
  },
  {
    path:'Pay',
    component:PaymentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
