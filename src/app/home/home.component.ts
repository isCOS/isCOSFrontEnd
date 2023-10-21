import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition, query, keyframes } from '@angular/animations';
import { RegistrationService } from '../service/registration.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('clickButtonRegister', [
      transition(':enter', [
        style({
          opacity: 0,
          height: '0px',
          transform: 'translateX(100%)'
        }),
        animate('800ms ease-in-out', style({
          opacity: 1,
          height: '0px',
          transform: 'translateX(0)'
        })),
      ]),
      transition(':leave', [
        animate('200ms ease-in-out', style({
          opacity: 0,
          height: '0px',
          transform: 'translateX(100%)'
        })),
      ]),
    ]),

    trigger('DescriptionEnter', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateX(-100%)'
        }),
        animate('800ms ease-in-out', style({
          opacity: 1,
          transform: 'translateX(0)'
        })),
      ]),

    ]),
  ]
})
export class HomeComponent implements OnInit {
  clickRegisterButton: boolean = true;
  DescriptionEnter: boolean = true;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.clickRegisterButton = true;
  }

  ngAfterViewInit(): void {
    this.DescriptionEnter = !this.DescriptionEnter;
  }


}
