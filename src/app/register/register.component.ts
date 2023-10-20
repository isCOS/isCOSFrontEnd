import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { RegistrationService } from '../service/registration.service';


interface driveLicences {
  name: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  showContinueButton = false;
  driveLicences: driveLicences[] | undefined;
  selectedDriveLicence: driveLicences | undefined;
  @Output() toggle = new EventEmitter<void>();
  emailRegex: any = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  value: string | undefined;

  ngOnInit(): void {
    this.driveLicences = [
      { name: 'B' },
      { name: 'C' },
      { name: 'C1' },
      { name: 'C1E' },
      { name: 'CE' },
      { name: 'D' },
      { name: 'D1' },
      { name: 'D1E' },
      { name: 'DE' }
    ];
  }

  onToggle() {
    this.toggle.emit();
  }
  constructor(private fb: FormBuilder, private datePipe: DatePipe, private regSer: RegistrationService) { }
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
    id: new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(this.emailRegex),
      ])
    ),
    date: new FormControl<Date | null>(null, Validators.required),
    selectedDriveLicence: new FormControl<driveLicences | null>(null),
    expiringLicenseDate: new FormControl<Date | null>(null, Validators.required),
    ragioneSociale: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    //Set date to the current date
  });

  proceedRegistration() {
    //this.form.reset();
    const tempDate = new Date(this.form.value.date!);
    const tempDate2 = new Date(this.form.value.expiringLicenseDate!);
    tempDate.setTime(tempDate.getTime() - tempDate.getTimezoneOffset() * 60 * 1000);
    tempDate2.setTime(tempDate2.getTime() - tempDate2.getTimezoneOffset() * 60 * 1000);
    tempDate.getTimezoneOffset();
    tempDate2.getTimezoneOffset();
    this.form.patchValue({ date: tempDate });
    this.form.patchValue({ expiringLicenseDate: tempDate2 });
    const toSend = {
      ...this.form.value,
      date: this.datePipe.transform(this.form.value.date, 'dd-MM-yyyy'),
      expiringLicenseDate: this.datePipe.transform(this.form.value.expiringLicenseDate, 'dd-MM-yyyy')
    };
    this.regSer.proceedRegistration(toSend).subscribe((data: any) => {
      console.log(data);
    });
    console.log(toSend);
  }

  onContinue() {
    this.showContinueButton = !this.showContinueButton;
  }
  notValidElement: any;
  isInvalid(controlName: string) {
    const control = this.form.get(controlName);
    const notValidElement = control?.invalid && (control.dirty || control.touched);
    console.log(notValidElement)
    return notValidElement;
  }


}
