import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Car } from '../../../classes/Car';
import { FirebaseService } from '../../services/firebase.service';


@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
  cars : Array<Car>;



  constructor(private firebase: FirebaseService) {
    this.cars = []
  }


  ngOnInit() {

    this.firebase.getCarList().subscribe((response: any)=>{
      Object.entries(response).forEach((element: any) => {
        this.cars.push(element[1]);
      });
    });
  }
  

  onDeleteClick(id_to_delete){
    
    this.firebase.getCarList().subscribe((response: any)=>{
      Object.entries(response).forEach((element: any) => {
        if(element[1].id == id_to_delete){
          const hash = element[0];
          this.firebase.deleteCar(element[0]);
          let tempcustomer;
          this.cars.forEach((car: any)=>{
            if(car.id == element[1].id){
              tempcustomer = car;
            }
          });
          let index = this.cars.indexOf(tempcustomer);
          this.cars.splice(index, 1);
        }
      });
    });
  }

}
