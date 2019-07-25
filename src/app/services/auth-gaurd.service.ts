import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService {

  constructor(private router : Router) { }

  setSession(key : string, value : string) {
    sessionStorage.setItem(key, value);
  }

  getSession(key : string) {
    return sessionStorage.getItem(key);
  }  
}
