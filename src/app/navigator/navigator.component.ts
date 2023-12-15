import { Component, OnInit, DoCheck } from '@angular/core';
import { Renderer2 } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import * as mapboxDirection from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import { VehicleService } from '../service/vehicle.service';
import { MapboxService } from '../service/mapbox.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';

interface vehicle {
  name: string;
  code: string;
}

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss'],
})
export class NavigatorComponent implements OnInit, DoCheck {
  style = 'mapbox://styles/mapbox/streets-v12';
  lat = 37.75;
  lng = -122.41;
  vehicles: any;
  selectedVehicle: any;
  selectedVehicleLicensePlate: any;
  originCoordinates: any;
  destinationCoordinates: any;
  gasStationRequestValid: boolean = false;
  gasStationList = [];
  requestSent: boolean = false; // Add this line
  markerFunctionThrow: boolean = false;
  fuelPercentageFunctionThrow: boolean = false;
  originCityName: any;
  destinationCityName: any;
  originCityNameValid: boolean = false;
  destinationCityNameValid: boolean = false;
  map: mapboxgl.Map;
  fuelPercentage: any;
  enableNavigation: boolean = false;
  directionsAdded: boolean = false;
  receivedResponse: boolean = true;
  route: any;
  token =
    'pk.eyJ1IjoidW1iZXJ0b2ZyYW5jZXNjbyIsImEiOiJjbG45d3B5NTcwYW5vMmpsNWZraHVxaXF1In0.doKaW59JSUO2QRP9IR6jgA';
  directions = new mapboxDirection({
    accessToken: mapboxgl.accessToken,
    interactive: false,
  });

  constructor(
    private renderer: Renderer2,
    private vehicleService: VehicleService,
    private mapboxService: MapboxService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private http: HttpClient
  ) {}
  ngOnInit() {
    const email = sessionStorage.getItem('email');
    this.loadScript(
      'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.1.1/mapbox-gl-directions.js'
    )
      .then(() =>
        this.loadScript(
          'https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.js'
        )
      )
      .then(() =>
        this.loadScript(
          'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.1.1/mapbox-gl-directions.css'
        )
      )
      .then(() => {
        this.loadMap();
      })
      .catch((error) =>
        console.error('Errore durante il caricamento degli script:', error)
      );
    this.vehicleService.GetListVehicleByUser(email).subscribe((res) => {
      this.vehicles = res.data;
      for (let i = 0; i < this.vehicles.length; i++) {
        this.vehicles[i].name =
          this.vehicles[i].brand + ' ' + this.vehicles[i].model;
        this.vehicles[i].code = this.vehicles[i].licensePlate;
        // console.log(this.vehicles[i].name, this.vehicles[i].code);
      }
    });
  }

  //Create a form
  selectVehicleForm = this.fb.group({
    vehicle: ['', Validators.required],
    value: [100, Validators.required],
  });

  //If the cities are selected, then run the function sendRequest()
  ngDoCheck() {
    if (this.enableNavigation) {
      if (this.map && !this.directionsAdded) {
        let directions = new mapboxDirection({
          accessToken: mapboxgl.accessToken,
          interactive: false,
        });
        this.map.addControl(directions, 'top-left');
        this.directionsAdded = true; // Set a flag to ensure directions are only added once
      }
    }
    if (
      this.originCityNameValid &&
      this.destinationCityNameValid &&
      !this.requestSent
    ) {
      console.log('origin coordinates', this.originCoordinates);
      console.log('destination coordinates', this.destinationCoordinates);
      const mapboxurl = 'https://api.mapbox.com/directions/v5/mapbox/driving/';
      const url = `${mapboxurl}${this.originCoordinates[0]}%2C${this.originCoordinates[1]}%3B${this.destinationCoordinates[0]}%2C${this.destinationCoordinates[1]}?alternatives=true&geometries=geojson&language=en&overview=full&steps=true&access_token=${this.token}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          //Get the route with the less km
          let routes = data.routes;
          let route =  routes.sort(this.compareDistance);
          console.log('sorted ',route)
          console.log('Return data from mapbox fetch', data);
        });
        this.map.on('load', function () {
          this.map.addSource('route', {
            'type': 'geojson',
            'data': {
              'type': 'Feature',
              'properties': {},
              'geometry': {
                'type': 'LineString',
                'coordinates': [
                  // Insert the coordinates of the route here
                ]
              }
            }
          });
        
          this.map.addLayer({
            'id': 'route',
            'type': 'line',
            'source': 'route',
            'layout': {
              'line-join': 'round',
              'line-cap': 'round'
            },
            'paint': {
              'line-color': '#888',
              'line-width': 8
            }
          });
        });
      this.sendRequest();
      this.requestSent = true; // Set the flag to true after sending the request
      return this.route;
    }
    if (this.gasStationRequestValid && !this.markerFunctionThrow) {
      this.addMarker();
      this.markerFunctionThrow = true;
    }
    return this.enableNavigation;
  }

  ngOnDestroy() {
    const mapboxScript = document.querySelector(
      'script[src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.1.1/mapbox-gl-directions.js"]'
    );
    if (mapboxScript) {
      mapboxScript.remove();
    }
    const mapboxCssLink = document.querySelector(
      'link[href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.1.1/mapbox-gl-directions.css"]'
    );
    if (mapboxCssLink) {
      mapboxCssLink.remove();
    }
  }

  async loadScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = this.renderer.createElement('script');
      script.src = src;
      script.onload = () => resolve();
      script.onerror = (error) => reject(error);
      this.renderer.appendChild(document.body, script);
    });
  }

  async loadMap() {
    // Carica lo script di Mapbox
    const mapboxScript = this.renderer.createElement('script');
    mapboxScript.src =
      'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.1.1/mapbox-gl-directions.js';
    this.renderer.appendChild(document.body, mapboxScript);

    // Carica il link CSS di Mapbox
    const mapboxCssLink = this.renderer.createElement('link');
    mapboxCssLink.rel = 'stylesheet';
    mapboxCssLink.href =
      'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.1.1/mapbox-gl-directions.css';
    mapboxCssLink.type = 'text/css';
    this.renderer.appendChild(document.head, mapboxCssLink);
    (mapboxgl as any).accessToken = this.token;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      zoom: 1.2,
      center: [12.48092, 41.88551],
      interactive: true,
      scrollZoom: true,
    });
    const size = 200;

    this.directions.on('origin', async (event) => {
      const origin = event.feature;
      this.originCoordinates = origin.geometry.coordinates;
      this.originCityName = await this.getCityName(
        origin.geometry.coordinates
      ).then((res) => {
        return res.split(',')[0];
      });
      this.originCityNameValid = true;
      return [
        this.originCityName,
        this.originCityNameValid,
        this.originCoordinates,
      ];
    });
    this.directions.on('destination', async (event) => {
      const destination = event.feature;
      this.destinationCoordinates = destination.geometry.coordinates;
      this.destinationCityName = await this.getCityName(
        destination.geometry.coordinates
      ).then((res) => {
        return res.split(',')[0];
      });
      this.destinationCityNameValid = true;
      return [
        this.destinationCityName,
        this.destinationCityNameValid,
        this.destinationCoordinates,
      ];
    });

    interface StyleImageInterface {
      width: number;
      height: number;
      data: Uint8Array;
      onAdd: () => void;
      render: () => boolean;
      context?: CanvasRenderingContext2D;
    }
    //Location pulsing dot
    const pulsingDot: StyleImageInterface = {
      // This implements `StyleImageInterface`
      // to draw a pulsing dot icon on the map.
      width: size,
      height: size,
      data: new Uint8Array(size * size * 4),
      // When the layer is added to the map,
      // get the rendering context for the map canvas.
      onAdd: function () {
        const canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        this.context = canvas.getContext('2d')!;
      },

      // Call once before every frame where the icon will be used.
      render: function () {
        const duration = 1000;
        const t = (performance.now() % duration) / duration;

        const radius = (size / 2) * 0.3;
        const outerRadius = (size / 2) * 0.7 * t + radius;
        if (this.context) {
          // Draw the outer circle.
          this.context.clearRect(0, 0, this.width, this.height);
          this.context.beginPath();
          this.context.arc(
            this.width / 2,
            this.height / 2,
            outerRadius,
            0,
            Math.PI * 2
          );
          this.context.fillStyle = `rgba(45, 85, 255, ${1 - t})`;
          this.context.fill();

          // Draw the inner circle.
          this.context.beginPath();
          this.context.arc(
            this.width / 2,
            this.height / 2,
            radius,
            0,
            Math.PI * 2
          );
          this.context.fillStyle = 'rgba(45, 85, 255, 1)';
          this.context.strokeStyle = 'white';
          this.context.lineWidth = 2 + 4 * (1 - t);
          this.context.fill();
          this.context.stroke();

          // Update this image's data with data from the canvas.
          this.data = new Uint8Array(
            this.context.getImageData(0, 0, this.width, this.height).data.buffer
          );

          // Continuously repaint the map, resulting
          // in the smooth animation of the dot.
          this.map.triggerRepaint();

          // Return `true` to let the map know that the image was updated.
          return true;
        } else {
          console.error('context is null');
          return false;
        }
      },
    };
    //Location pulsing dot
    this.map.on('load', () => {
      this.map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });
      let coordinates;

      navigator.geolocation.getCurrentPosition(function (position) {
        coordinates = [position.coords.longitude, position.coords.latitude];
        console.log(coordinates);

        this.map.addSource('dot-point', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: coordinates,
                },
                properties: {},
              },
            ],
          },
        });

        // Check if the dot-point source exists and is valid
        if (!this.map.getSource('dot-point')) {
          console.error('dot-point source does not exist');
        }

        this.map.addLayer({
          id: 'layer-with-pulsing-dot',
          type: 'symbol',
          source: 'dot-point',
          layout: {
            'icon-image': 'pulsing-dot',
            //Change the size and the color of the pulsing dot here
            'icon-size': 0.3,
            visibility: 'visible', // Ensure the layer is visible
          },
        });

        // Check if the layer exists and is valid
        if (!this.map.getLayer('layer-with-pulsing-dot')) {
          console.error('layer-with-pulsing-dot does not exist');
        }
      });
    });

    this.map.on('style.load', () => {
      this.map.setFog({}); // Set the default atmosphere style
    });

    this.map.on('style.load', () => {
      this.map.setFog({}); // Set the default atmosphere style
      spinGlobe();
    });

    this.spinGlobe();
    //When animation is complete, start spinning if there is no ongoing interaction
    this.map.on('moveend', () => {
      this.spinGlobe();
    });
    return this.originCityName, this.destinationCityName;
  }

  //Sping globe function
  spinGlobe() {
    // The following values can be changed to control rotation speed:
    // At low zooms, complete a revolution every two minutes.
    const secondsPerRevolution = 120;
    // Above zoom level 5, do not rotate.
    const maxSpinZoom = 5;
    // Rotate at intermediate speeds between zoom levels 3 and 5.
    const slowSpinZoom = 3;

    let userInteracting = false;
    let spinEnabled = true;
    //Sping globe function
    // function spinGlobe() {
    //   const zoom = this.map.getZoom();
    //   if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
    //     let distancePerSecond = 360 / secondsPerRevolution;
    //     if (zoom > slowSpinZoom) {
    //       // Slow spinning at higher zooms
    //       const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
    //       distancePerSecond *= zoomDif;
    //     }
    //     const center = this.map.getCenter();
    //     center.lng -= distancePerSecond;
    //     // Smoothly animate the map over one second.
    //     // When this animation is complete, it calls a 'moveend' event.
    //     this.map.easeTo({ center, duration: 1000, easing: (n) => n });
    //   }
    // }
    // spinGlobe();
    // When animation is complete, start spinning if there is no ongoing interaction
    // this.map.on('moveend', () => {
    //   spinGlobe();
    // });
    return this.originCityName, this.destinationCityName;
  }
  // onVehicleChange(selectedVehicle: any): void {
  //   this.selectedVehicleLicensePlate = selectedVehicle.licensePlate;
  //   this.validVehicle = true;
  //   this.loadMap();
  // }

  // onVehicleFuelPercentageChange(e: any): void {
  //   this.fuelPercentage = e;
  //   this.fuelPercentageValid = true;
  //   this.fuelPercentageFunctionThrow = true;
  // }

  async getCityName(coordinates) {
    return fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates[0]},${coordinates[1]}.json?access_token=${mapboxgl.accessToken}`
    )
      .then((response) => response.json())
      .then((data) => {
        // Iterate over the features array
        for (let i = 0; i < data.features.length; i++) {
          let feature = data.features[i];
          // If the place_type array includes 'place', return the place_name
          if (feature.place_type.includes('place')) {
            return feature.place_name;
            console.log(feature.place_name);
          }
        }
        // If no feature has place_type 'place', return the place_name of the first feature
        return data.features[0].place_name;
      })
      .catch((error) => console.log(error));
  }

  startNavigation() {
    // console.log(this.selectVehicleForm.value);
    this.selectedVehicle = this.selectVehicleForm.value.vehicle;
    this.selectedVehicleLicensePlate = this.selectedVehicle.licensePlate;
    this.fuelPercentage = this.selectVehicleForm.value.value;
    // console.log(this.selectedVehicleLicensePlate, this.fuelPercentage);
    this.enableNavigation = true;
    this.directions.setInteractive(false);
  }

  sendRequest() {
    this.receivedResponse = false;
    this.mapboxService
      .FindGasStation(
        this.selectedVehicleLicensePlate,
        this.fuelPercentage,
        this.originCoordinates[0],
        this.originCoordinates[1],
        this.destinationCoordinates[0],
        this.destinationCoordinates[1]
      )
      .subscribe((res) => {
        this.receivedResponse = true;
        this.gasStationList = res.data;
        // console.log(this.gasStationList);
        if (res.code === 0) {
          this.gasStationRequestValid = true;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: res.message,
          });
          //intercept http error
        }
        // console.log(this.gasStationList);
      });
  }

  stopNavigation() {
    this.gasStationList = [];
    this.directionsAdded = false;
    this.markerFunctionThrow = false;
    this.gasStationRequestValid = false;
    this.enableNavigation = false;
    this.requestSent = false;
    this.originCityNameValid = false;
    this.destinationCityNameValid = false;
    this.directions.removeRoutes();
    this.receivedResponse = true;
    this.selectVehicleForm.reset();
    this.loadMap();
  }

  compareDistance(a:any, b:any) {
    return a.duration > b.duration;
  }

  async addMarker() {
    for (let i = 0; i < this.gasStationList.length; i++) {
      // console.log(this.gasStationList[i].coordinates.latitude, this.gasStationList[i].coordinates.longitude);
      const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: false,
        closeOnClick: false,
      }).setHTML(
        `${this.gasStationList[i].name}<br>` +
          `Street: ${this.gasStationList[i].address}<br>` +
          `€ ${this.gasStationList[i].price.toFixed(4)}`
      );
      const marker = new mapboxgl.Marker({ color: 'red' })
        .setLngLat([
          this.gasStationList[i].coordinates.longitude,
          this.gasStationList[i].coordinates.latitude,
        ])
        .setPopup(popup)
        .addTo(this.map);
      marker.getElement().addEventListener('mouseenter', () => {
        marker.togglePopup();
      });
      marker.getElement().addEventListener('mouseleave', () => {
        marker.togglePopup();
      });
    }
    
    // console.log(`I'm into addMarker function`, this.gasStationList);
  }
}
