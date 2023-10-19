import { Component } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';


@Component({
  selector: 'app-working-globe',
  templateUrl: './working-globe.component.html',
  styleUrls: ['./working-globe.component.scss']
})
export class WorkingGlobeComponent {
  style = 'mapbox://styles/mapbox/streets-v12';
  lat = 37.75;
  lng = -122.41;
  constructor() { }
  ngOnInit() {
    const token =
      'pk.eyJ1IjoidW1iZXJ0b2ZyYW5jZXNjbyIsImEiOiJjbG45d3B5NTcwYW5vMmpsNWZraHVxaXF1In0.doKaW59JSUO2QRP9IR6jgA';
    (mapboxgl as any).accessToken = token;
    const map = new mapboxgl.Map({
      container: 'map',
      // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-79.4512, 43.6568],
      zoom: 13
      });
      // map.addControl(new MapboxDirections({
      //   accessToken: mapboxgl.accessToken
      // }), 'top-left');

  }
}
