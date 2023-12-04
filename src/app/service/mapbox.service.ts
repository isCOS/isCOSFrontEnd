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

  FindGasStation(licensePlate: any, startTown: any, endTown: any){
    const url = `http://${this.ip}/api/MapBox/FindGasStation?licensePlate=${licensePlate}&startTown=${startTown}&endTown=${endTown}`;
    return this.http.get<any>(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/plain',
        'Access-Control-Allow-Origin': '*',
      }
    });
  }
}
