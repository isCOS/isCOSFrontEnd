import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  // registrationUrl = environment.apiUrl + '/User/AddPersona';
  apiurl = 'http://localhost:3000/accounts'
  constructor(private http: HttpClient) {}

  getUserByEmail(email:any) {
    return this.http.post<any>(this.apiurl, email);
  }

  proceedRegistration(data: any) {
    return this.http.post(this.apiurl, data);
  }

}
