import { Injectable } from '@angular/core';
import { FIREBASE_BASE_URL } from './../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Customer } from '../../classes/Customer';
import { Car } from '../../classes/Car';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private http: HttpClient) { }

  getCarList() {
    return this.http.get(FIREBASE_BASE_URL + 'cars.json');
  }

  getCustomerList() {
    return this.http.get(FIREBASE_BASE_URL + 'customers.json');
  }

  addCustomer(customer: Customer) {
    this.http.post(FIREBASE_BASE_URL + 'customers.json', customer).toPromise();
  }

  addCar(car: Car) {
    this.http.post(FIREBASE_BASE_URL + 'cars.json', car).toPromise();
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
