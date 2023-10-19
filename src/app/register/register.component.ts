import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';


interface driveLicences {
  name: string;
  code: string
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  showContinueButton = false;
  driveLicences: driveLicences[] | undefined;
  selectedDriveLicence: driveLicences| undefined;
  @Output() toggle = new EventEmitter<void>();
  emailRegex: any = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  value: string | undefined;

  ngOnInit(): void {
    this.driveLicences = [
      { name: 'A', code: 'a' },
      { name: 'B', code: 'b' },
      { name: 'C', code: 'c' },
      { name: 'C1', code: 'c1' },
      { name: 'C1E', code: 'c1e' },
      { name: 'CE', code: 'ce' },
      { name: 'D', code: 'd' },
      { name: 'D1', code: 'd1' },
      { name: 'D1E', code: 'd1e' },
      { name: 'DE', code: 'de' }
      
  ];
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
    date: new FormControl<Date | null>(null, Validators.required),
    driveLicence: new FormControl<Date | null>(null, Validators.required),
    expiringLicenseDate: new FormControl(''),
    ragioneSociale: new FormControl(''),
    password: new FormControl(''),
    //Set date to the current date
  });

  sendRegistrationRequest() {
    console.log(this.form.value);
    this.form.reset();
  }

  onContinue() {
    this.showContinueButton = true;
  } 

}
