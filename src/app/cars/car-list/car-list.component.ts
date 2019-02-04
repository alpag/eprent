import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Car } from '../../../classes/Car';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { FirebaseService } from '../../services/firebase.service';
import { FormControl } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

export interface DeleteDialogData{
  name: string;
  lastname: string;
  deleteStatus : boolean;
}
@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
  cars : Car[];
  dataSource: MatTableDataSource<Car>;
  columnsToDisplay = ['photoUrl', 'id', 'make', 'model', 'color', 'production', 'price', 'options'];
  @ViewChild(MatPaginator) paginator : MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  idFilter = new FormControl('');
  makeFilter = new FormControl('');
  modelFilter = new FormControl('');
  colorFilter = new FormControl('');
  productionFilter = new FormControl('');
  priceFilter = new FormControl('');

  filterValues = {
    id: '',
    make: '',
    model: '',
    color: '',
    production: '',
    price: ''
  }

  ngOnInit() {
    this.firebase.getCarList().subscribe((response: any)=>{
      if(response) {
        Object.entries(response).forEach((element: any) => {
          this.cars.push(element[1]);
        });
        this.dataSource = new MatTableDataSource(this.cars);
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
      this.makeFilter.valueChanges
      .subscribe(
        make => {
          this.filterValues.make = make;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
      this.modelFilter.valueChanges
      .subscribe(
        model => {
          this.filterValues.model = model;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
      this.colorFilter.valueChanges
      .subscribe(
        color => {
          this.filterValues.color = color;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
      this.productionFilter.valueChanges
      .subscribe(
        production => {
          this.filterValues.production = production;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
      this.priceFilter.valueChanges
      .subscribe(
        price => {
          this.filterValues.price = price;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
  }

  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function(data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.id.indexOf(searchTerms.id) !== -1
        && data.make.indexOf(searchTerms.make) !== -1
        && data.model.indexOf(searchTerms.model) !== -1
        && data.color.toLowerCase().indexOf(searchTerms.color) !== -1
        && data.production.toLowerCase().indexOf(searchTerms.production) !== -1
        && ("" + data.price).toLowerCase().indexOf(searchTerms.price) !== -1;

    }
    return filterFunction;
  }
  

  constructor(private firebase: FirebaseService, public deleteDialog: MatDialog, private route: ActivatedRoute,
    private router: Router) {
    this.cars = []
  }

  openDeleteDialog(id: String, _make: String, _model: String): void {
    const dialogRef = this.deleteDialog.open(DeleteCarDialog, {
      width: '250px',
      data: {make: _make, model: _model}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.onDeleteClick(id);
      }
    });
  }

  openEdit(id: String) {
    this.router.navigateByUrl(`cars/edit-car/${id}`);
  }

  onDeleteClick(id_to_delete){
    
    this.firebase.getCarList().subscribe((response: any)=>{
      if(response) {
        Object.entries(response).forEach((element: any) => {
          if(element[1].id == id_to_delete){
            const hash = element[0];
            this.firebase.deleteCar(element[0]);
            let tempcustomer;
            this.cars.forEach((car: any)=>{
              if(car.id == element[1].id){
                tempcustomer = car;
              }
            });
            let index = this.cars.indexOf(tempcustomer);
            this.cars.splice(index, 1);
            this.dataSource.paginator = this.paginator;
          }
        });
      }
    });
  }

}

@Component({
  selector: 'delete-dialog',
  templateUrl: 'car-delete-dialog.html',
})
export class DeleteCarDialog {
  status: boolean;
  constructor(
    public dialogRef: MatDialogRef<DeleteCarDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DeleteDialogData) {
      this.status = false;
    }
}
