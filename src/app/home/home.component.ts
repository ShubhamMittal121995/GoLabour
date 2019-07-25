import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGaurdService } from '../services/auth-gaurd.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  images = ["./assets/images/carpenter.jpeg", "./assets/images/electrician.jpeg", "./assets/images/plumber.jpg"];
  
  constructor(private router: Router, private auth : AuthGaurdService) { }

  ngOnInit() {
  }

  signUp() {
    this.router.navigateByUrl("/Signup");
  }

  check(key : string) { 
    if (this.auth.getSession(key) == "true") {
      return false;
    }
    else if (this.auth.getSession(key) == "user") {
      return false;
    }
    return true;
  }
}
