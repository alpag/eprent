import { Component, OnInit, ViewChild } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Customer } from '../../../classes/Customer';
import { Car } from '../../../classes/Car';
import { Reservation } from '../../../classes/Reservation';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {
  reservations: Reservation[];
  cars: Car[];
  customers: Customer[];
  dataSource: MatTableDataSource<Reservation>;
  columnsToDisplay = ['id', 'startDate', 'endDate', 'customer', 'car', 'action'];
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private firebase: FirebaseService) {
    this.reservations = [];
    this.cars = [];
    this.customers = [];
   }

  ngOnInit() {
    this.firebase.getReservationList().subscribe((reservationResponse: any) => {
      if(reservationResponse) {
        this.firebase.getCarList().toPromise().then((response: any) => {
          Object.entries(response).forEach((element: any) => {
            this.cars.push(element[1]);
          });
          this.firebase.getCustomerList().toPromise().then((response: any) => {
            Object.entries(response).forEach((element: any) => {
              this.customers.push(element[1]);
            });
            Object.entries(reservationResponse).forEach((element: any) => {
              this.reservations.push(element[1]);
              let carId = -1, customerId = -1;
              this.cars.forEach((car, index) => {
                if(car.id == element[1].carId) {
                  carId = index;
                  return false;
                }
              });
              this.customers.forEach((customer, index) => {
                if(customer.id == element[1].customerId) {
                  customerId = index;
                  return false;
                }
              });
              if(carId == -1 || customerId == -1) {
                this.reservations.splice(this.reservations.length - 1, 1);
                return false;
              }
              this.reservations[this.reservations.length - 1].car = this.cars[carId];
              this.reservations[this.reservations.length - 1].customer = this.customers[customerId];
            });
            this.dataSource = new MatTableDataSource(this.reservations);
            this.dataSource.paginator = this.paginator;
          });
        });
      }
    });    
  }

  public onDeleteClick(id: number) {
    this.firebase.getReservationList().subscribe((response: any)=>{
      Object.entries(response).forEach((element: any) => {
        if(element[1].id == id){
          const hash = element[0];
          this.firebase.deleteReservation(element[0]);
          let tempReservation;
          this.reservations.forEach((reservation: any)=>{
            if(reservation.id == element[1].id){
              tempReservation = reservation;
            }
          });
          let index = this.reservations.indexOf(tempReservation);
          this.reservations.splice(index, 1);
          this.dataSource.paginator = this.paginator;
        }
      });
    });
  }

}
