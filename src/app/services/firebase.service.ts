import { Injectable } from '@angular/core';
import { FIREBASE_BASE_URL } from './../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Customer } from '../../classes/Customer';
import { Car } from '../../classes/Car';
import { Reservation } from '../../classes/Reservation';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private headers= new HttpHeaders({'Access-Control-Allow-Origin' : '*'});

  constructor(private http: HttpClient) { }

  getCarList() {
    return this.http.get(FIREBASE_BASE_URL + 'cars.json');
  }

  getCustomerList() {
    return this.http.get(FIREBASE_BASE_URL + 'customers.json');
  }

  getReservationList() {
    return this.http.get(FIREBASE_BASE_URL + 'reservations.json');
  }

  addCustomer(customer: Customer) {
    this.http.post(FIREBASE_BASE_URL + 'customers.json', customer).toPromise();
  }

  updateCustomer(customer: Customer, hash : String){
    this.http.put(FIREBASE_BASE_URL + 'customers/' + hash + '.json', customer).toPromise();
  }

  deleteCustomer(hash : String){
    this.http.delete(FIREBASE_BASE_URL+ 'customers/' + hash + '.json').toPromise();
  }

  addCar(car: Car) {
    this.http.post(FIREBASE_BASE_URL + 'cars.json', car).toPromise();
  }

  addReservation(reservation: Reservation) {
    return this.http.post(FIREBASE_BASE_URL + 'reservations.json', reservation).toPromise();
  }
  
  updateCar(car: Car, hash : String){
    this.http.put(FIREBASE_BASE_URL + 'cars/' + hash + '.json', car).toPromise();
  }

  deleteCar(hash : String){
    this.http.delete(FIREBASE_BASE_URL+ 'cars/' + hash + '.json').toPromise();
  }

  deleteReservation(hash: String) {
    this.http.delete(FIREBASE_BASE_URL + 'reservations/' + hash + '.json').toPromise();
  }
  // addCar(heroID: number) {
  //   this.http.post(FIREBASE_BASE_URL + 'favourites/heroes.json', {id: heroID}).toPromise();
  // }

  // removeHeroFromFavourites(key: String) {
  //   this.http.delete(FIREBASE_BASE_URL + 'favourites/heroes/' + key + '.json').toPromise();
  // }

  // addComicToFavourites(comicID: number) {
  //   this.http.post(FIREBASE_BASE_URL + 'favourites/comics.json', {id: comicID}).toPromise();
  // }

  // removeComicFromFavourites(key: String) {
  //   this.http.delete(FIREBASE_BASE_URL + 'favourites/comics/' + key + '.json').toPromise();
  // }
}
