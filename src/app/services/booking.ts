import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Booking {
  private apiUrl = 'https://freeapi.gerasim.in/api/CarRentalApp';

  private http = inject(HttpClient);

  getAllBookings() {
    return this.http.get(this.apiUrl + '/geAllBookings');
  }

  createBooking(booking: any) {
    return this.http.post(this.apiUrl + '/CreateNewBooking', booking);
  }

  deleteBooking(bookingId: number) {
    return this.http.delete(this.apiUrl + '/DeletBookingById?Id=' + bookingId);
  }
}
