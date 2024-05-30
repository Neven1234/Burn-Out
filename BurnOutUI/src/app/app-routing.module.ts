import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Componencts/login/login.component';
import { RegisterComponent } from './Componencts/register/register.component';
import { EventsListComponent } from './Componencts/events-list/events-list.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
