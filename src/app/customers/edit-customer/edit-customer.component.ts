import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from './../../../classes/Customer'
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { FirebaseService } from '../../services/firebase.service';



@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {

  customers$: Observable<Object>;
  selectedId: number;
  customer: Customer;
  hash : String;

  constructor(
    private route: ActivatedRoute,
    private firebase: FirebaseService
    
  ) {
    this.customer = new Customer();

    
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.selectedId = Number.parseInt(params['id']);
   });
    console.log(this.selectedId + " plus kkkkk");

    this.firebase.getCustomerList().subscribe((response: any)=>{
      Object.entries(response).forEach((element: any) => {
        if(element[1].id == this.selectedId){
          this.customer = element[1];
          this.hash = element[0];
          console.log(this.hash);
        }
      });
    });
    
  }


  onSubmit() {

    this.firebase.updateCustomer(this.customer, this.hash);
    this.customer = new Customer();
    //redirect
  }

}
