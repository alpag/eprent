import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
 
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
 
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReservationListComponent } from './reservations/reservation-list/reservation-list.component';
import { NewReservationComponent } from './reservations/new-reservation/new-reservation.component';
import { CarListComponent } from './cars/car-list/car-list.component';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';
 
@NgModule({
  declarations: [
    AppComponent,
    ReservationListComponent,
    NewReservationComponent,
    CarListComponent,
    CustomerListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AppRoutingModule, // for database
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }