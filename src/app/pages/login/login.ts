import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  imports: [FormsModule],
  standalone: true,
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  showPass = false;
  togglePass(){
    this.showPass = !this.showPass;
  }
  
  loginData = {
    email: '',
    password: ''
  }

  creds = {
    email: 'admin@gmail.com',
    password: 'CarRental1234'
  }

  constructor(private router: Router){}

  check(){
    console.log(this.loginData);

    if(this.loginData.email === this.creds.email && this.loginData.password === this.creds.password){
      this.router.navigate(['/dashboard']);
    }
    else{
      alert("Invalid email or password");
    }
  }
}
