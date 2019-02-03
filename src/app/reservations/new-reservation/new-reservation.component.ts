import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { MessageService } from '../../services/message.service';

import { Customer } from '../../../classes/Customer';
import { Car } from '../../../classes/Car';
import { Reservation } from '../../../classes/Reservation';
import { element } from '../../../../node_modules/@angular/core/src/render3';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-new-reservation',
  templateUrl: './new-reservation.component.html',
  styleUrls: ['./new-reservation.component.css']
})
export class NewReservationComponent implements OnInit {
  customers : Array<Customer>;
  cars: Array<Car>;
  messages: Array<String>;
  selectedCar: Car;
  selectedCustomer: Customer;
  reservation: Reservation;
  
  

  constructor(private firebase: FirebaseService, private messageService: MessageService, private route: ActivatedRoute,
    private router: Router) {
    this.customers = [];
    this.cars = [];
    this.messages = [];
    this.reservation = new Reservation();
  }

  ngOnInit() {
    this.firebase.getCustomerList().subscribe((response: any)=>{
      Object.entries(response).forEach((element: any) => {
        this.customers.push(element[1]);
      });
    });

    this.firebase.getCarList().subscribe((response: any) => {
      Object.entries(response).forEach((element: any) => {
        this.cars.push(element[1]);
      });
    });
  }

  onSubmit() {
    console.log(this.reservation);
    if(this.reservation.startDate && this.reservation.endDate && this.reservation.carId && this.reservation.customerId) {
      this.firebase.addReservation(this.reservation).then((data) => {
        this.messageService.add('Dodano rezerwację!');
        this.router.navigateByUrl('reservations');
        this.reservation = new Reservation();
      });
    }
  }

}
