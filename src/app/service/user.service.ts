import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class userService {

  // registrationUrl = environment.apiUrl + '/User/AddPersona';
  apiurl = 'http://localhost:3000/accounts'
  constructor(private http: HttpClient) {}

  getUserByEmail(code: any) {
    return this.http.get(this.apiurl + '/' +code ); 
  }

  proceedRegistration(data: any) {
    return this.http.post(this.apiurl, data);
  }

  proceedLogin(data: any) {
    return this.http.get(this.apiurl, data);
  }

}
