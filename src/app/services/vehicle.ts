import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Vehicle {
  private apiUrl = 'https://freeapi.gerasim.in/api/CarRentalApp';

  private http = inject(HttpClient);

  getCars() {
    return this.http.get(this.apiUrl + '/GetCars');
  }

  deleteCar(carId: number) {
    return this.http.delete(this.apiUrl + '/DeleteCarbyCarId?carId=' + carId);
  }

  insertCar(car: any) {
    return this.http.post(`${this.apiUrl}/CreateNewCar`, car);
  }

  updateCar(car: any) {
    return this.http.put(`${this.apiUrl}/UpdateCar`, car);
  }
}
