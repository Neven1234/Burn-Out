import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Componencts/login/login.component';
import { RegisterComponent } from './Componencts/register/register.component';
import { EventsListComponent } from './Componencts/events-list/events-list.component';
import { AddEventComponent } from './Componencts/add-event/add-event.component';
import { NavComponent } from './Componencts/nav/nav.component';
import { EventCardComponent } from './Componencts/event-card/event-card.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthService } from './Services/auth.service';
import { ErrorInspecter } from './ErrorHandel/ErrorIntercepter';
import { PaymentComponent } from './Componencts/payment/payment.component';
import { EventEditModalComponent } from './Componencts/event-edit-modal/event-edit-modal.component';
import { JwtModule } from '@auth0/angular-jwt';
export function TokenGetter(){
  return localStorage.getItem('token')
}
@NgModule({
  declarations: [

    AppComponent,
    LoginComponent,
    RegisterComponent,
    EventsListComponent,
    AddEventComponent,
    NavComponent,
    EventCardComponent,
    PaymentComponent,
    EventEditModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config:{
        tokenGetter:TokenGetter,
        allowedDomains:['localhost:8088'],
        disallowedRoutes:['localhost:8088/api/auth']
      }
    }),
  ],
  providers: [
    AuthService,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: ErrorInspecter,
        multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
