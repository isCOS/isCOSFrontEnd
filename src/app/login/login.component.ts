import { Component} from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
 
  @Output() toggle = new EventEmitter<void>();

  onToggle() {
    this.toggle.emit();
  }

}