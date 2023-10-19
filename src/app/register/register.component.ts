import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @Output() toggle = new EventEmitter<void>();
  emailRegex: any = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  value: string | undefined;

  ngOnInit(): void {
  }

  onToggle() {
    this.toggle.emit();
  }
  constructor(private fb: FormBuilder) { }
  //Build the form
  form = this.fb.group({
    name: new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(25),
      ])
    ),
    lastName: new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ])
    ),
    email: new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(this.emailRegex),
      ])
    ),
    date: new FormControl(''),
    driveLicense: new FormControl(''),
    expiringLicenseDate: new FormControl(''),
    ragioneSociale: new FormControl(''),
    password: new FormControl(''),
    //Set date to the current date
  });

  sendRegistrationRequest() {
    console.log(this.form.value);
    this.form.reset();
  }

}
