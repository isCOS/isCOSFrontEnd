import { Component } from '@angular/core';
import { AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-globe',
  templateUrl: './globe.component.html',
  styleUrls: ['./globe.component.scss'],
})
export class GlobeComponent {
  style = 'mapbox://styles/mapbox/streets-v12';
  lat = 37.75;
  lng = -122.41;
  constructor() {}
  ngOnInit() {
    const token =
      'pk.eyJ1IjoidW1iZXJ0b2ZyYW5jZXNjbyIsImEiOiJjbG45d3B5NTcwYW5vMmpsNWZraHVxaXF1In0.doKaW59JSUO2QRP9IR6jgA';
    (mapboxgl as any).accessToken = token;
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
        //Display the map as a globe, since satellite-v9 defaults to Mercator
      zoom: 0.01,
      center: [-90, 40],
    });

    map.on('style.load', () => {
      map.setFog({}); // Set the default atmosphere style
      spinGlobe();
    });

    // The following values can be changed to control rotation speed:

    // At low zooms, complete a revolution every two minutes.
    const secondsPerRevolution = 120;
    // Above zoom level 5, do not rotate.
    const maxSpinZoom = 5;
    // Rotate at intermediate speeds between zoom levels 3 and 5.
    const slowSpinZoom = 3;

    let userInteracting = false;
    let spinEnabled = true;

    function spinGlobe() {
      const zoom = map.getZoom();
      if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
        let distancePerSecond = 360 / secondsPerRevolution;
        if (zoom > slowSpinZoom) {
          // Slow spinning at higher zooms
          const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
          distancePerSecond *= zoomDif;
        }
        const center = map.getCenter();
        center.lng -= distancePerSecond;
        // Smoothly animate the map over one second.
        // When this animation is complete, it calls a 'moveend' event.
        map.easeTo({ center, duration: 1000, easing: (n) => n });
      }
    }

    // Pause spinning on interaction
    map.on('mousedown', () => {
      userInteracting = true;
    });

    // Restart spinning the globe when interaction is complete
    map.on('mouseup', () => {
      userInteracting = false;
      spinGlobe();
    });

    // These events account for cases where the mouse has moved
    // off the map, so 'mouseup' will not be fired.
    map.on('dragend', () => {
      userInteracting = false;
      spinGlobe();
    });
    map.on('pitchend', () => {
      userInteracting = false;
      spinGlobe();
    });
    map.on('rotateend', () => {
      userInteracting = false;
      spinGlobe();
    });

    // When animation is complete, start spinning if there is no ongoing interaction
    map.on('moveend', () => {
      spinGlobe();
    });


  }
}
