import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Vehicle } from '../../services/vehicle';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { Pagination } from '../../components/pagination/pagination';
import { Subject, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [CommonModule, Pagination, FormsModule],
  selector: 'app-vehicle-master',
  styleUrl: './vehicle-master.css',
  templateUrl: './vehicle-master.html',
})
export class VehicleMaster implements OnInit {
  cars: any[] = [];

  car = {
    carId: 0,
    brand: '',
    model: '',
    year: 0,
    color: '',
    dailyRate: 0,
    carImage: '',
    regNo: '',
  };

  currentPage = 1;
  itemsPerPage = 5;
  searchText = '';
  searchSubject = new Subject<string>();
  filteredCars: any[] = [];

  isEditMode = false;

  constructor(
    private vehicleService: Vehicle,
    private cdr: ChangeDetectorRef,
  ) {}

  resetForm() {
    this.car = {
      carId: 0,
      brand: '',
      model: '',
      year: 0,
      color: '',
      dailyRate: 0,
      carImage: '',
      regNo: '',
    };
  }

  ngOnInit(): void {
    // console.log('Vehicle page loaded');
    this.cdr.detectChanges();
    this.vehicleService.getCars().subscribe((response: any) => {
      // console.log('API response:', response);
      // console.log('Cars:', response.data);

      this.cars = response.data;
      this.filteredCars = this.cars;

      // console.log('cars after assignment:', this.cars.length);

      this.cdr.detectChanges();
    });
  }

  get paginatedCars() {
    const start = (this.currentPage - 1) * this.itemsPerPage;

    return this.filteredCars.slice(start, start + this.itemsPerPage);
  }

  searchCars(searchText: string) {
    this.searchSubject
      .pipe(
        mergeMap((text) => {
          const search = text.toLowerCase();

          const result = this.cars.filter((car) =>
            (car.brand + ' ' + car.model).toLowerCase().includes(search),
          );

          return of(result);
        }),
      )
      .subscribe((result) => {
        this.filteredCars = result;
        this.currentPage = 1;
      });

    this.searchSubject.next(searchText);
  }

  deleteCar(carId: number) {
    this.vehicleService.deleteCar(carId).subscribe((response) => {
      console.log('Delete response: ', response);

      this.cars = this.cars.filter((car) => car.carId !== carId);
      this.filteredCars = this.filteredCars.filter((car) => car.carId !== carId);

      this.cdr.detectChanges();
    });
  }
  insertCar() {
    this.vehicleService.insertCar(this.car).subscribe((response) => {
      console.log('Insert response:', response);

      this.vehicleService.getCars().subscribe((response: any) => {
        this.cars = response.data;
        this.filteredCars = this.cars;

        this.currentPage = 1;

        this.cdr.detectChanges();

        this.resetForm();
      });
    });
  }

  editCar(car: any) {
    this.car = { ...car };
    this.isEditMode = true;
  }

  updateCar() {
    this.vehicleService.updateCar(this.car).subscribe((response) => {
      console.log('Update response:', response);

      this.vehicleService.getCars().subscribe((response: any) => {
        this.cars = response.data;
        this.filteredCars = this.cars;

        this.currentPage = 1;
        this.isEditMode = false;

        this.resetForm();

        this.cdr.detectChanges();
      });
    });
  }
}
