import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  ip = '127.0.0.1:5294';
  apiurl = `http://${this.ip}/api/User/`;

  constructor(private http: HttpClient) { }

  AddVehicle(data: any) {
    const url = `http://${this.ip}/api/Vehicle/AddVehicle`;
    return this.http.post<any>(url, data, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/plain',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  GetListVehicleByUser(id: any) {
    const encodedEmail = encodeURIComponent(id);
    const url = `http://${this.ip}/api/User/GetListVehicleByUser?email=${encodedEmail}`;
    return this.http.get<any>(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/plain',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  EditVehicle(data: any) {
    const url = `http://${this.ip}/api/Vehicle/EditVehicle`;
    return this.http.put<any>(url, data, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/plain',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
  
}
