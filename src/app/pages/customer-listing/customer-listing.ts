import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Customer as CustomerService } from '../../services/customer';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-customer-listing',
  imports: [CommonModule],
  templateUrl: './customer-listing.html',
  styleUrl: './customer-listing.css',
})
export class CustomerListing implements OnInit {
  customers: any[] = [];

  constructor(
    private customerService: CustomerService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe((response: any) => {
      console.log('Customers API response:', response);

      this.customers = response.data;

      console.log('Customers:', this.customers);

      this.cdr.detectChanges();
    });
  }
}
