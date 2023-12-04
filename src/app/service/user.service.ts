import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class userService {
  // ip = "10.31.12.211:5294"
  ip = '127.0.0.1:5294';
  apiurl = `http://${this.ip}/api/User/`;
  constructor(private http: HttpClient) {}

  AddUser(data: any) {
    const url = `http://${this.ip}/api/User/AddUser`;
    return this.http.post<any>(url, data, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/plain',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  ProceedLogin(user: any){
    const url = `http://${this.ip}/api/User/GetUserByEmailAndPassword?email=${user.email}&Password=${user.password}`;
    return this.http.get<any>(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/plain',
        'Access-Control-Allow-Origin': '*',
      }
    });
  }

  EditUser(user: any) {
    const url = `http://${this.ip}/api/User/EditUser`;
    return this.http.post<any>(url, user, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/plain',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
  
  CheckAuthoritation(email: any, token: any) {
    const url = `http://${this.ip}/api/User/checkAuthorization?email=${email}&token=${token}`
    return this.http.get<any>(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/plain',
        'Access-Control-Allow-Origin': '*',
      }
    });
  }
  
  verifyEmail(email: any, code: any) {
    const encodedEmail = encodeURIComponent(email);
    console.log(encodedEmail);
    const url = `http://${this.ip}/api/User/VerificationUser?email=${encodedEmail}&token=${code}`
    return this.http.put<any>(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/plain',
        'Access-Control-Allow-Origin': '*',
      }
    });
  }

  changePasswordRequest(data:any){
    const url = `http://${this.ip}/api/User/ChangePasswordRequest`;
    return this.http.post<any>(url, data, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/plain',
        'Access-Control-Allow-Origin': '*',
      }
    });
  }

  confirmChangePassword(email: any, token:any){
    const encodedEmail = encodeURIComponent(email);
    const url = `http://${this.ip}/api/User/ChangePassword?email=${encodedEmail}&token=${token}`;
    return this.http.post<any>(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/plain',
        'Access-Control-Allow-Origin': '*',
      }
    });
  }

}



/*
:method: POST
:scheme: https
:authority: 192.168.70.167:5294
:path: /api/User/AddUser
Content-Type: application/json
Accept: text/plain
Sec-Fetch-Site: same-origin
Accept-Language: it-IT,it;q=0.9
Accept-Encoding: gzip, deflate, br
Sec-Fetch-Mode: cors
Host: 192.168.70.167:5294
Origin: https://192.168.70.167:5294
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Safari/605.1.15
Referer: https://192.168.70.167:5294/index.html
Content-Length: 258
Connection: keep-alive
Sec-Fetch-Dest: empty

*/
