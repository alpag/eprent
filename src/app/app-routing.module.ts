import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReservationListComponent } from './reservations/reservation-list/reservation-list.component';
import { NewReservationComponent } from './reservations/new-reservation/new-reservation.component';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { CarListComponent } from './cars/car-list/car-list.component';


const routes: Routes = [
  { path: '', component: ReservationListComponent },
  { path: 'reservations', component: ReservationListComponent },
  { path: 'reservations/new', component: NewReservationComponent },
  { path: 'cars', component: CarListComponent },
  { path: 'customers', component: CustomerListComponent },
];


@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})
export class AppRoutingModule {

  

 }
