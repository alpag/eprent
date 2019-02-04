import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Car } from '../../../classes/Car';
import { FirebaseService } from '../../services/firebase.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';




@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {
  car : Car;
  cars: Array<Car>;
  targetId: number;

  constructor(private firebase: FirebaseService, public router: Router) {
    this.car = new Car();
  }

  ngOnInit() {
    this.cars = [];
    this.firebase.getCarList().subscribe((response: any)=>{
      if(response) {
        Object.entries(response).forEach((element: any) => {
          this.cars.push(element[1]);
        });
        if(this.cars != null){
          this.targetId = Number(this.cars[this.cars.length-1].id)+1;
        }
        else
          this.targetId = 1;
      } else {
        this.targetId = 1;
      }
    });
  }


  items: Observable<any[]>;
 

 
  onSubmit() {
    this.car.setId(this.targetId.toString());
    this.targetId++;
    this.firebase.addCar(this.car);
    this.router.navigateByUrl('cars');
    // this.car = new Car();
  }

}
