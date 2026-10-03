import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pagination } from '../../components/pagination/pagination';
import { Booking as BookingService } from '../../services/booking';
import { ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Vehicle } from '../../services/vehicle';

@Component({
  selector: 'app-booking',
  imports: [CommonModule, Pagination, FormsModule],
  templateUrl: './booking.html',
  styleUrl: './booking.css',
})
export class Booking implements OnInit {
  bookings: any[] = [];
  cars: any[] = [];

  newBooking = {
    CustomerName: '',
    CustomerCity: '',
    MobileNo: '',
    Email: '',
    BookingId: 0,
    CarId: 0,
    BookingDate: '',
    Discount: 0,
    TotalBillAmount: 0,
  };

  isCarAvailable = true;

  currentPage = 1;
  itemsPerPage = 5;

  constructor(
    private bookingService: BookingService,
    private cdr: ChangeDetectorRef,
    private vehicleService: Vehicle,
  ) {}

  ngOnInit(): void {
    this.bookingService.getAllBookings().subscribe((response: any) => {
      console.log('Bookings API response:', response);
      this.bookings = response.data;
      console.log('Bookings:', this.bookings);
      this.cdr.detectChanges();
    });

    this.vehicleService.getCars().subscribe((response: any) => {
      console.log('Cars:', response.data);
      this.cars = response.data;
      this.cdr.detectChanges();
    });
  }

  deleteBooking(bookingId: number) {
    this.bookingService.deleteBooking(bookingId).subscribe((response: any) => {
      console.log('Delete booking response:', response);

      this.bookingService.getAllBookings().subscribe((response: any) => {
        this.bookings = response.data;

        this.currentPage = 1;

        this.cdr.detectChanges();
      });
    });
  }

  get paginatedBookings() {
    const start = (this.currentPage - 1) * this.itemsPerPage;

    return this.bookings.slice(start, start + this.itemsPerPage);
  }

  checkCarAvailability() {
    const selectedCar = this.cars.find((car) => car.carId == this.newBooking.CarId);

    if (!selectedCar || !this.newBooking.BookingDate) {
      this.isCarAvailable = true;
      return;
    }

    const selectedDate = this.newBooking.BookingDate.substring(0, 10);

    const alreadyBooked = this.bookings.some(
      (booking) =>
        booking.brand === selectedCar.brand &&
        booking.model === selectedCar.model &&
        booking.bookingDate.substring(0, 10) === selectedDate,
    );

    this.isCarAvailable = !alreadyBooked;

    console.log('Car available:', this.isCarAvailable);
  }

  createBooking() {
    console.log('Booking payload:', this.newBooking);

    if (!this.isCarAvailable) {
      return;
    }

    this.bookingService.createBooking(this.newBooking).subscribe((response: any) => {
      console.log('Create booking response:', response);

      this.bookingService.getAllBookings().subscribe((response: any) => {
        this.bookings = response.data;

        this.currentPage = 1;

        this.resetBookingForm();

        this.cdr.detectChanges();
      });
    });
  }

  calculateTotal() {
    const selectedCar = this.cars.find((car) => car.carId == this.newBooking.CarId);

    if (selectedCar) {
      this.newBooking.TotalBillAmount = selectedCar.dailyRate - this.newBooking.Discount;
    }
  }

  resetBookingForm() {
    this.newBooking = {
      CustomerName: '',
      CustomerCity: '',
      MobileNo: '',
      Email: '',
      BookingId: 0,
      CarId: 0,
      BookingDate: '',
      Discount: 0,
      TotalBillAmount: 0,
    };

    this.isCarAvailable = true;
  }
}
