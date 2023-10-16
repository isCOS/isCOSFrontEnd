import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition, query, keyframes } from '@angular/animations';

@Component({
  selector: 'app-gestione',
  templateUrl: './gestione.component.html',
  styleUrls: ['./gestione.component.scss'],
  animations: [
  ]
})
export class GestioneComponent {
  visible: boolean = false;
  showDialog() {
        this.visible = true;
    }

  constructor() { }

}
