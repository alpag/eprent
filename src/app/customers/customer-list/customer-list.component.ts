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
  
  onDeleteClick(id_to_delete){
    
    this.firebase.getCustomerList().subscribe((response: any)=>{
      Object.entries(response).forEach((element: any) => {
        if(element[1].id == id_to_delete){
          const hash = element[0];
          this.firebase.deleteCustomer(element[0]);
          let tempcustomer;
          this.customers.forEach((customer: any)=>{
            if(customer.id == element[1].id){
              tempcustomer = customer;
            }
          });
          let index = this.customers.indexOf(tempcustomer);
          this.customers.splice(index, 1);
        }
      });
    });
  }


}
