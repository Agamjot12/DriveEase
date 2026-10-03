import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Dashboard {

  private apiUrl = 'https://freeapi.gerasim.in/api/CarRentalApp';

  private http = inject(HttpClient);

  getDashboardData() {
    return this.http.get(this.apiUrl + '/GetDashboardData');
  }

}