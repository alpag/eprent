import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Customer } from '../../../classes/Customer';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { FormControl } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


export interface DeleteDialogData{
  name: string;
  lastname: string;
  deleteStatus : boolean;
}
@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})

export class CustomerListComponent implements OnInit {
  customers : Customer[];
  dataSource: MatTableDataSource<Customer>;
  deleteStatus : boolean;
  columnsToDisplay = ['id', 'name', 'lastname', 'email', 'phone', 'options'];
  @ViewChild(MatPaginator) paginator : MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  idFilter = new FormControl('');
  nameFilter = new FormControl('');
  lastnameFilter = new FormControl('');
  emailFilter = new FormControl('');
  phoneFilter = new FormControl('');
  filterValues = {
    id: '',
    name: '',
    lastname: '',
    email: '',
    phone: ''
  }

  ngOnInit() {
    this.firebase.getCustomerList().subscribe((response: any)=>{
      if(response) {
        Object.entries(response).forEach((element: any) => {
          this.customers.push(element[1]);
        });
        this.dataSource = new MatTableDataSource(this.customers);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = this.createFilter();
      }
    });

    this.idFilter.valueChanges
      .subscribe(
        id => {
          this.filterValues.id = id;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.nameFilter.valueChanges
      .subscribe(
        name => {
          this.filterValues.name = name;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.lastnameFilter.valueChanges
      .subscribe(
        lastname => {
          this.filterValues.lastname = lastname;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.emailFilter.valueChanges
      .subscribe(
        email => {
          this.filterValues.email = email;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.phoneFilter.valueChanges
      .subscribe(
        phone => {
          this.filterValues.phone = phone;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
  }

  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function(data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.id.indexOf(searchTerms.id) !== -1
        && data.name.indexOf(searchTerms.name) !== -1
        && data.lastname.indexOf(searchTerms.lastname) !== -1
        && data.email.toLowerCase().indexOf(searchTerms.email) !== -1
        && data.phone.toLowerCase().indexOf(searchTerms.phone) !== -1;
    }
    return filterFunction;
  }
  
 
  constructor(private firebase: FirebaseService, public deleteDialog: MatDialog, private route: ActivatedRoute,
    private router: Router) {
    this.customers=[];
  }
  
  onDeleteClick(id_to_delete){
    
    this.firebase.getCustomerList().subscribe((response: any)=>{
      if(response) {
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
            this.dataSource.paginator = this.paginator;
          }
        });
      }
    });
  }

  openDeleteDialog(id: String, _name: String, _lastname: String): void {
    const dialogRef = this.deleteDialog.open(DeleteCustomerDialog, {
      width: '250px',
      data: {name: _name, lastname: _lastname}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.onDeleteClick(id);
      }
    });
  }

  openEdit(id: String) {
    this.router.navigateByUrl(`customers/edit-customer/${id}`);
  }

}

@Component({
  selector: 'delete-dialog',
  templateUrl: 'customer-delete-dialog.html',
})
export class DeleteCustomerDialog {
  status: boolean;
  constructor(
    public dialogRef: MatDialogRef<DeleteCustomerDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DeleteDialogData) {
      this.status = false;
    }
}
