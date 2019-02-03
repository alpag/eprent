import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReservationListComponent } from './reservations/reservation-list/reservation-list.component';
import { NewReservationComponent } from './reservations/new-reservation/new-reservation.component';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { AddCustomerComponent } from './customers/add-customer/add-customer.component';
import { CarListComponent } from './cars/car-list/car-list.component';
import { AddCarComponent } from './cars/add-car/add-car.component';
import { EditCustomerComponent } from './customers/edit-customer/edit-customer.component'
import { EditCarComponent } from './cars/edit-car/edit-car.component'

const routes: Routes = [
  { path: '', component: ReservationListComponent },
  { path: 'reservations', component: ReservationListComponent },
  { path: 'reservations/new', component: NewReservationComponent },
  { path: 'cars', component: CarListComponent },
  { path: 'customers', component: CustomerListComponent },
  { path: 'customers/add-customer', component: AddCustomerComponent },
  { path: 'customers/edit-customer/:id', component: EditCustomerComponent },
  { path: 'cars/add-car', component: AddCarComponent },
  { path: 'cars/edit-car/:id', component: EditCarComponent },
  
];


@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule {

  

 }
