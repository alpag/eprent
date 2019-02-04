import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from './../../../classes/Customer'
import { switchMap } from 'rxjs/operators';
import { FirebaseService } from '../../services/firebase.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';



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
    private firebase: FirebaseService,
    private router: Router,
    
  ) {
    this.customer = new Customer();

    
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.selectedId = Number.parseInt(params['id']);
   });

    this.firebase.getCustomerList().subscribe((response: any)=>{
      if(response) {
        Object.entries(response).forEach((element: any) => {
          if(element[1].id == this.selectedId){
            this.customer = element[1];
            this.hash = element[0];
          }
        });
      }
    });
    
  }


  onSubmit() {

    this.firebase.updateCustomer(this.customer, this.hash);
    this.customer = new Customer();
    this.router.navigateByUrl('customers');
    //redirect
  }

}
