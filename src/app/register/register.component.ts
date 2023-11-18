import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { userService } from '../service/user.service';
import { MessageService } from 'primeng/api';


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
  constructor(private fb: FormBuilder, private datePipe: DatePipe, private userService: userService, private messageService: MessageService) { }
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
    surname: new FormControl(
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
    dateBirth: new FormControl<Date | null>(null, Validators.required),
    drivingLicense: new FormControl<driveLicences | null>(null),
    deadLine: new FormControl<Date | null>(null, Validators.required),
    businessName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    repeatPassword: new FormControl('', Validators.required),
    //Set date to the current date
  });

  proceedRegistration() {
    //this.form.reset();
    const tempDate = new Date(this.form.value.dateBirth!);
    const tempDate2 = new Date(this.form.value.deadLine!);
    tempDate.setTime(tempDate.getTime() - tempDate.getTimezoneOffset() * 60 * 1000);
    tempDate2.setTime(tempDate2.getTime() - tempDate2.getTimezoneOffset() * 60 * 1000);
    // tempDate.getTimezoneOffset();
    // tempDate2.getTimezoneOffset();
    this.form.patchValue({ dateBirth: tempDate });
    this.form.patchValue({ deadLine: tempDate2 });
    const toSend = {
      ...this.form.value,
      // dateBirth: this.datePipe.transform(this.form.value.dateBirth, 'dd-MM-yyyy'),
      // deadLine: this.datePipe.transform(this.form.value.deadLine, 'dd-MM-yyyy'),
      drivingLicense: {type: this.form.value.drivingLicense, deadLine: this.form.value.deadLine! },
    };
    this.userService.AddUser(toSend).subscribe((data: any) => {
      console.log(data);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Registration completed' });
    });
    
    console.log(toSend);
  }

  onContinue() {
    this.showContinueButton = !this.showContinueButton;
  }



}
