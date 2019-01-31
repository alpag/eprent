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
  
}
