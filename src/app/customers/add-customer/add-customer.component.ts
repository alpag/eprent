import { Component, OnInit, Input } from '@angular/core';
import { Customer } from './../../../classes/Customer';
import { AngularFireDatabase } from '@angular/fire/database';
import { FirebaseService } from '../../services/firebase.service';
import { Variable } from '@angular/compiler/src/render3/r3_ast';



@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
  customer: Customer;
  customers : Array<Customer>;
  targetId : number;
  
  constructor(private firebase: FirebaseService) { 
    this.customer = new Customer();
  }

  ngOnInit() {
    this.customers = [];
    this.firebase.getCustomerList().subscribe((response: any)=>{
      Object.entries(response).forEach((element: any) => {
        this.customers.push(element[1]);
      });
      if(this.customers != null){
        this.targetId = Number(this.customers[this.customers.length-1].id)+1;
      }
      else
        this.targetId = 0;
    });
  }

  onSubmit() {
    
    this.customer.setId(this.targetId.toString())
    this.targetId++;
    this.firebase.addCustomer(this.customer);

  }

}
