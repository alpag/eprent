import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReservationListComponent } from './reservations/reservation-list/reservation-list.component';
import { NewReservationComponent } from './reservations/new-reservation/new-reservation.component';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { AddCustomerComponent } from './customers/add-customer/add-customer.component';
import { CarListComponent } from './cars/car-list/car-list.component';
import { AddCarComponent } from './cars/add-car/add-car.component';


const routes: Routes = [
  { path: '', component: ReservationListComponent },
  { path: 'reservations', component: ReservationListComponent },
  { path: 'reservations/new', component: NewReservationComponent },
  { path: 'cars', component: CarListComponent },
  { path: 'customers', component: CustomerListComponent },
  { path: 'customers/add-customer', component: AddCustomerComponent },
  { path: 'cars/add-car', component: AddCarComponent },
];


@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule {

  

 }
