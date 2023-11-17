import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  ip = "192.168.102.167:5294"
  // GetAllUsers() {
  //   return this.http.get(this.apiurl);
  // }

  // GetByCode(code: any) {
  //   return this.http.get(this.apiurl + '/' +code);
  // }

  // ProceedRegistrater(data: any) {
  //   return this.http.post(this.apiurl, data);
  // }

  // UpdateUser(code: any, data: any) {
  //   return this.http.put(`${this.apiurl}/${code}`, data);
  // }

  CheckAuthoritation(email: any, token: any): Observable<string> {
    const url = `http://192.168.102.167:5294/api/User/checkAuthorization?email=${email}&token=${token}`
    return this.http.get<any>(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'text/plain',
        'Access-Control-Allow-Origin': '*',
      }
    }).pipe(map(res => res.code));
  }

  login() {
    return sessionStorage.getItem('username') != null;
  }

  logout() {
    sessionStorage.removeItem('username');
  }
}
