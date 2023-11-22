import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { userService } from '../service/user.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { DialogsService } from '../service/dialogs.service';

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
  confirmAccountDialog: boolean = false;

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
      { name: 'DE' },
    ];
    this.dialogsService.currentConfirmDialog.subscribe(
      (confirmAccountDialog) =>
        (this.confirmAccountDialog = confirmAccountDialog)
    );

  }

  onToggle() {
    this.toggle.emit();
  }
  constructor(
    private fb: FormBuilder,
    private dialogsService: DialogsService,
    private datePipe: DatePipe,
    private userService: userService,
    private messageService: MessageService
  ) {}
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
    const tempDate = new Date(this.form.value.dateBirth);
    const tempDate2 = new Date(this.form.value.deadLine);
    this.form.patchValue({ dateBirth: tempDate });
    this.form.patchValue({ deadLine: tempDate2 });

    const toSend = {
      ...this.form.value,
      dateBirth: this.datePipe.transform(
        this.form.value.dateBirth,
        'yyyy-MM-dd'
      ),
      deadLine: this.datePipe.transform(this.form.value.deadLine, 'yyyy-MM-dd'),
      drivingLicense: {
        type: this.form.value.drivingLicense,
        deadLine: this.datePipe.transform(
          this.form.value.deadLine,
          'yyyy-MM-dd'
        ),
      },
    };
    this.userService.AddUser(toSend).subscribe((data: any) => {
      console.log(data);
      sessionStorage.setItem('email', this.form.value.email);
      if (data.message === 'Success') {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Registration completed',
        });
        this.form.reset();
        this.showConfirmAccount();
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Registration failed',
        });
      }
    });
    // console.log(toSend);
  }

  showConfirmAccount() {
    this.dialogsService.changeConfirmDialog(true);
  }

  onContinue() {
    this.showContinueButton = !this.showContinueButton;
  }
}
