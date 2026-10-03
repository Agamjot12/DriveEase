import { Component, OnInit } from '@angular/core';
import { Dashboard as DashboardService } from '../../services/dashboard';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  dashboardData: any = {};

  constructor(
    private dashboardService: DashboardService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.dashboardService.getDashboardData().subscribe((response: any) => {
      console.log('Dashboard API response:', response);

      this.dashboardData = response.data[0];

      console.log('Dashboard data:', this.dashboardData);

      this.cdr.detectChanges();
    });
  }
}
