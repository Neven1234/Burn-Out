import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Componencts/login/login.component';
import { RegisterComponent } from './Componencts/register/register.component';
import { EventsListComponent } from './Componencts/events-list/events-list.component';
import { EventDetailsComponent } from './Componencts/event-details/event-details.component';
import { AddEventComponent } from './Componencts/add-event/add-event.component';
import { NavComponent } from './Componencts/nav/nav.component';
import { EventCardComponent } from './Componencts/event-card/event-card.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    EventsListComponent,
    EventDetailsComponent,
    AddEventComponent,
    NavComponent,
    EventCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
