import { Component} from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('leaveRight', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-100%)' }),
        animate('800ms ease-in-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        animate('800ms ease-in-out', style({ opacity: 0, transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class LoginComponent {
  showBox: boolean = true;
 
  @Output() toggle = new EventEmitter<void>();

  onToggle() {
    this.toggle.emit();
    this.showBox = !this.showBox;
  }

}