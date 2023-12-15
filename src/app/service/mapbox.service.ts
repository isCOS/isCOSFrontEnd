import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MapboxService {

  constructor(private http: HttpClient) { }
  ip = '127.0.0.1:5294';
  apiurl = `http://${this.ip}/api/User/`;

  GetCoordinates(city: any) {
    const url = `http://${this.ip}/api/MapBox/GetCoordinates?city=${city}`;
    return this.http.get<any>(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/plain',
        'Access-Control-Allow-Origin': '*',
      }
    });
  }

  FindGasStation(licensePlate: any, percentTank: any, initLongitude: any, initLatitude: any, endLongitude: any, endLatitude: any) {
    const url = `http://${this.ip}/api/MapBox/FindGasStation?licensePlate=${licensePlate}&percentTank=${percentTank}&initLongitude=${initLongitude}&initLatitude=${initLatitude}&endLongitude=${endLongitude}&endLatitude=${endLatitude}`;
    return this.http.get<any>(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/plain',
        'Access-Control-Allow-Origin': '*',
      }
    });
  }
}
