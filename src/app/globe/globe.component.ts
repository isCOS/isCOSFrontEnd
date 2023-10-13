import { Component } from '@angular/core';
import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-globe',
  templateUrl: './globe.component.html',
  styleUrls: ['./globe.component.scss']
})
export class GlobeComponent {
  map: mapboxgl.Map | undefined;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 37.75;
  lng = -122.41;
  constructor() { }
  ngOnInit() {
    const token = "pk.eyJ1IjoidW1iZXJ0b2ZyYW5jZXNjbyIsImEiOiJjbG45d3B5NTcwYW5vMmpsNWZraHVxaXF1In0.doKaW59JSUO2QRP9IR6jgA";
    (mapboxgl as any).accessToken = token;
      this.map = new mapboxgl.Map({
        container: 'map',
        style: this.style,
        zoom: 13,
        center: [this.lng, this.lat]
    });
    // Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());
  }
}
