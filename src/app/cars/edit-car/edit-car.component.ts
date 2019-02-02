import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from './../../../classes/Car'
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.css']
})
export class EditCarComponent implements OnInit {

  cars$: Observable<Object>;
  selectedId: number;
  car: Car;
  hash : String;

  constructor(
    private route: ActivatedRoute,
    private firebase: FirebaseService
    
  ) {
    this.car = new Car();

    
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.selectedId = Number.parseInt(params['id']);
   });
    console.log(this.selectedId + " <-to jest przekazane id");

    this.firebase.getCarList().subscribe((response: any)=>{
      Object.entries(response).forEach((element: any) => {
        if(element[1].id == this.selectedId){
          this.car = element[1];
          this.hash = element[0];
          console.log(this.hash);
        }
      });
    });

  }


  onSubmit() {

    this.firebase.updateCar(this.car, this.hash);
    this.car = new Car();
    //redirect
  }

}