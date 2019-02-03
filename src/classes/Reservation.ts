import { Car } from './Car';
import { Customer } from './Customer';
export class Reservation {
    id: String;
    startDate: Date;
    endDate: Date;
    customerId: Number;
    carId: Number;
    car: Car;
    customer: Customer;
  }