import { Component} from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { FormControl, FormBuilder, Validators } from '@angular/forms';

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
  emailRegex: any = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  value: string | undefined;

  onToggle() {
    this.toggle.emit();
    this.showBox = !this.showBox;
  }
  constructor(private fb: FormBuilder) { }
  form = this.fb.group({
    email: new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(this.emailRegex),
      ])
    ),
    password: new FormControl(''),
  });

  sendLoginRequest() {
    console.log(this.form.value);
    this.form.reset();
  }

}