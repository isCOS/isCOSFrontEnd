import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  ip = "10.31.12.211:5294"

  CheckAuthoritation(email: any, token: any): Observable<string> {
    const url = `http://${this.ip}/api/User/checkAuthorization?email=${email}&token=${token}`
    return this.http.get<any>(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'text/plain',
        'Access-Control-Allow-Origin': '*',
      }
    }).pipe(map(res => res.code));
  }

  login() {
    return sessionStorage.getItem('email') != null;
  }

  logout() {
    sessionStorage.removeItem('username');
  }
}
