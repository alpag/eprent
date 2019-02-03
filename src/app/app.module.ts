import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
 
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
 
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReservationListComponent } from './reservations/reservation-list/reservation-list.component';
import { NewReservationComponent } from './reservations/new-reservation/new-reservation.component';
import { CarListComponent } from './cars/car-list/car-list.component';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { AddCarComponent } from './cars/add-car/add-car.component';
import { AddCustomerComponent } from './customers/add-customer/add-customer.component';
import { HttpClientModule } from '@angular/common/http';
import { MessagesComponent } from './messages/messages.component';
import { EditCustomerComponent } from './customers/edit-customer/edit-customer.component';
import { EditCarComponent } from './cars/edit-car/edit-car.component';

 
@NgModule({
  declarations: [
    AppComponent,
    ReservationListComponent,
    NewReservationComponent,
    CarListComponent,
    CustomerListComponent,
    AddCarComponent,
    AddCustomerComponent,
    MessagesComponent,
    EditCustomerComponent,
    EditCarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgSelectModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AppRoutingModule, // for database
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }