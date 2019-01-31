import { Component, OnInit, Input } from '@angular/core';
import { Customer } from './../../../classes/Customer';
import { AngularFireDatabase } from '@angular/fire/database';
import { FirebaseService } from '../../services/firebase.service';



@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
  customer: Customer;
  constructor(private firebase: FirebaseService) { 
    this.customer = new Customer();
  }

  ngOnInit() {
  }

  onSubmit() {
    this.firebase.addCustomer(this.customer);
    this.customer = new Customer();

  }

}
