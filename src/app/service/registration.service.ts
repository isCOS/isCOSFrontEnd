import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  registrationUrl = environment.apiUrl + '/User/AddPersona';
  constructor(private http: HttpClient) {}

  sendRegistrationRequest(user:any) {
    return this.http.post<any>(this.registrationUrl, user);
  }

}
