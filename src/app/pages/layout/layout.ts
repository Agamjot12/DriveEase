import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet, RouterLink],
  standalone:true,
  selector: 'app-layout',
  styleUrl: './layout.css',
  templateUrl: './layout.html',
})
export class Layout {
  constructor(private router:Router) {}

  logout(){
    localStorage.removeItem('userEmail');
    this.router.navigate(['/login']);
  }

  userEmail = localStorage.getItem('userEmail') || '';
  getUserName(){
    return this.userEmail.split('@')[0];
  }
}
