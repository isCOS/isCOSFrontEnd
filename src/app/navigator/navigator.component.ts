import { Component, OnInit } from '@angular/core';
import { Renderer2 } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import * as mapboxDirection from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';



@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss'],
})
export class NavigatorComponent implements OnInit {
  style = 'mapbox://styles/mapbox/streets-v12';
  lat = 37.75;
  lng = -122.41;
  constructor(private renderer: Renderer2) { }
 ngOnInit() {
  
    this.loadScript('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.1.1/mapbox-gl-directions.js')
    .then(() => this.loadScript('https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.js'))
    .then(() => this.loadScript('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.1.1/mapbox-gl-directions.css'))
    .then(() => {
      this.loadMap();
    })
    .catch((error) => console.error('Errore durante il caricamento degli script:', error));
 }



  ngOnDestroy() {
    const mapboxScript = document.querySelector('script[src="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.1.1/mapbox-gl-directions.js"]');
    if (mapboxScript) {
      mapboxScript.remove();
    }
  
    const mapboxCssLink = document.querySelector('link[href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.1.1/mapbox-gl-directions.css"]');
    if (mapboxCssLink) {
      mapboxCssLink.remove();
    }
  }

  loadScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = this.renderer.createElement('script');
      script.src = src;
      script.onload = () => resolve();
      script.onerror = (error) => reject(error);
      this.renderer.appendChild(document.body, script);
    });
  }

  loadMap(){
          // Carica lo script di Mapbox
          const mapboxScript = this.renderer.createElement('script');
          mapboxScript.src = 'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.1.1/mapbox-gl-directions.js';
          this.renderer.appendChild(document.body, mapboxScript);
        
          // Carica il link CSS di Mapbox
          const mapboxCssLink = this.renderer.createElement('link');
          mapboxCssLink.rel = 'stylesheet';
          mapboxCssLink.href = 'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.1.1/mapbox-gl-directions.css';
          mapboxCssLink.type = 'text/css';
          this.renderer.appendChild(document.head, mapboxCssLink);
    const token =
      'pk.eyJ1IjoidW1iZXJ0b2ZyYW5jZXNjbyIsImEiOiJjbG45d3B5NTcwYW5vMmpsNWZraHVxaXF1In0.doKaW59JSUO2QRP9IR6jgA';
    (mapboxgl as any).accessToken = token;
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      zoom: 1.2,
      center: [41.9027835, 12.4963655],
      interactive: false,
      scrollZoom: false,
    });

    map.addControl(
      new mapboxDirection({
      accessToken: mapboxgl.accessToken
      }),
      'top-left'
      );

    const size = 200;

    interface StyleImageInterface {
      width: number;
      height: number;
      data: Uint8Array;
      onAdd: () => void;
      render: () => boolean;
      context?: CanvasRenderingContext2D;
    }

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
          map.triggerRepaint();

          // Return `true` to let the map know that the image was updated.
          return true;
        } else {
          console.error('context is null');
          return false;
        }
      },
    };
    

    map.on('load', () => {
      map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });
      let coordinates;

      navigator.geolocation.getCurrentPosition(function (position) {
        coordinates = [position.coords.longitude, position.coords.latitude];
        console.log(coordinates);

        map.addSource('dot-point', {
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
        if (!map.getSource('dot-point')) {
          console.error('dot-point source does not exist');
        }

        map.addLayer({
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
        if (!map.getLayer('layer-with-pulsing-dot')) {
          console.error('layer-with-pulsing-dot does not exist');
        }
      });
    });

    map.on('style.load', () => {
      map.setFog({}); // Set the default atmosphere style
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
    spinGlobe();

    // When animation is complete, start spinning if there is no ongoing interaction
    map.on('moveend', () => {
      spinGlobe();
    });
  }
}
