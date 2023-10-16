import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition, query, keyframes } from '@angular/animations';

@Component({
  selector: 'app-gestione',
  templateUrl: './gestione.component.html',
  styleUrls: ['./gestione.component.scss'],
  animations: [
    trigger('DescriptionEnter', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('600ms ease-in-out', style({
          opacity: 1,
          transform: 'translateX(0)'
        })),
      ]),
      
    ]),
  ]
})
export class GestioneComponent {
  DescriptionEnter: boolean = true;

  ngAfterViewInit(): void {
    this.DescriptionEnter = !this.DescriptionEnter;
  }


  constructor() { }

}
