import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class userService {

  // registrationUrl = environment.apiUrl + '/User/AddPersona';
  // apiurl = 'http://localhost:3000/accounts'
  apiurl = 'https://192.168.70.167:5294/api/User/AddUser'
  constructor(private http: HttpClient) {}

  AddUser(data: any) {
    return this.http.post(this.apiurl, data); 
  }

  proceedRegistration(data: any) {
    return this.http.post(this.apiurl, data);
  }

  proceedLogin(data: any) {
    return this.http.get(this.apiurl, data);
  }

}
