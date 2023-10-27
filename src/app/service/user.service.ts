import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class userService {

  // registrationUrl = environment.apiUrl + '/User/AddPersona';
  // apiurl = 'http://localhost:3000/accounts'
  apiurl = 'http://192.168.70.167:5294/api/User/AddUser'
  constructor(private http: HttpClient) {}

  AddUser(data: any) {
    return this.http.post<any>(
      this.apiurl,
      data,
      {
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'text/plain',
          'Access-Control-Allow-Origin': '*'
        }
      }      
      ); 
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
