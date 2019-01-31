import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Car } from '../../../classes/Car';
import { FirebaseService } from '../../services/firebase.service';



@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {
  car : Car;

  ngOnInit() {
  }


  items: Observable<any[]>;
 
  constructor(private firebase: FirebaseService) {
    this.car = new Car();
  }
 
  onSubmit() {
    console.log(this.firebase);
    this.firebase.addCar(this.car);
    this.car = new Car();
  }

}
