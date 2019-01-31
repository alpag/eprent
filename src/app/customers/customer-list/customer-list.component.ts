import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { FirebaseService } from '../../services/firebase.service';
import { Customer } from '../../../classes/Customer';


@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  customers : Array<Customer>;

  ngOnInit() {
    this.firebase.getCustomerList().subscribe((response: any)=>{
      Object.entries(response).forEach((element: any) => {
        this.customers.push(element[1]);
      });
    });
  }
  
 
  constructor(private firebase: FirebaseService) {
    this.customers=[];
  }
 

}
