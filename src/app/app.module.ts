import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
 
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
 
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReservationListComponent } from './reservations/reservation-list/reservation-list.component';
import { NewReservationComponent } from './reservations/new-reservation/new-reservation.component';
import { CarListComponent, DeleteCarDialog } from './cars/car-list/car-list.component';
import { CustomerListComponent, DeleteCustomerDialog } from './customers/customer-list/customer-list.component';
import { AddCarComponent } from './cars/add-car/add-car.component';
import { AddCustomerComponent } from './customers/add-customer/add-customer.component';
import { HttpClientModule } from '@angular/common/http';
import { MessagesComponent } from './messages/messages.component';
import { EditCustomerComponent } from './customers/edit-customer/edit-customer.component';
import { EditCarComponent } from './cars/edit-car/edit-car.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatPaginatorModule,
        MatPaginatorIntl,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule
} from '@angular/material';
import { MatPaginatorIntlPl } from './customers/customer-list/customer-paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import 'hammerjs';

 
@NgModule({
  declarations: [
    AppComponent,
    ReservationListComponent,
    NewReservationComponent,
    CarListComponent,
    CustomerListComponent,
    AddCarComponent,
    AddCustomerComponent,
    MessagesComponent,
    EditCustomerComponent,
    EditCarComponent,
    DeleteCustomerDialog,
    DeleteCarDialog,
  ],
  entryComponents: [
    DeleteCustomerDialog,
    DeleteCarDialog
  ],
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule,
    NgSelectModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AppRoutingModule, // for database
    HttpClientModule, BrowserAnimationsModule,
    MatTableModule, MatPaginatorModule, MatSortModule, MatFormFieldModule, MatInputModule, MatExpansionModule, MatIconModule, MatMenuModule, MatDialogModule
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlPl}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }