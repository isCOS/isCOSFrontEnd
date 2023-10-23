import { Component } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { userService } from '../service/user.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

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
  userdata: any;

  onToggle() {
    this.toggle.emit();
    this.showBox = !this.showBox;
  }
  constructor(private fb: FormBuilder, private userService: userService, private messageService: MessageService, private router: Router) { }
  form = this.fb.group({
    id: new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(this.emailRegex),
      ])
    ),
    password: new FormControl('', Validators.required),
  });

  sendLoginRequest() {
    console.log(this.form.value);
    this.form.reset();
  }
  checkCorrectPassword() {
    this.userService.getUserByEmail(this.form.value.id).subscribe((res) => {
      this.userdata =  res;
      if (this.form.value.password === this.userdata.password) {
        console.log('ok');
        // this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login effettuato con successo' });
        this.router.navigate(['/gestione']);
      } else if (this.form.value.password !== this.userdata.password) {
        console.log('no');
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Password errata' });
      }
    },
      error => {
        if (error.status === 404) {
          this.messageService.add({ severity: 'error', summary: 'Errore', detail: 'User not found' });
        }
      });
  }

}