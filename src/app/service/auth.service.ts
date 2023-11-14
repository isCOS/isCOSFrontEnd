import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  checkLogin() {  
    return sessionStorage.getItem('user') != null;
  }
  
  constructor() { }
}
