import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { userService } from '../../service/user.service';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { DialogsService } from 'src/app/service/dialogs.service';

interface driveLicences {
  name: string;
}

@Component({
  selector: 'app-gestione-account',
  templateUrl: './gestioneAccount.component.html',
  styleUrls: ['./gestioneAccount.component.scss'],
})
export class GestioneAccountComponent implements OnInit {

  showContinueButton = false;
  driveLicences: driveLicences[] | undefined;
  selectedDriveLicence: driveLicences | undefined;
  @Output() toggle = new EventEmitter<void>();
  emailRegex: any = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  value!: object;
  user: any;
  userEmail: any;
  jsonUser: any;
  stringifiedUser: any;
  editMode: boolean = true;
  clonedUser: { [s: string]: any } = {};

  constructor(
    private userService: userService,
    private fb: FormBuilder,
    private dialogsService: DialogsService,
    private datePipe: DatePipe,
    private messageService: MessageService
  ) {}

  // .ts file
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
    this.loadUserData();
    this.dialogsService.currentEditMode.subscribe(editMode => this.editMode = editMode);
    console.log('User session storage dialog: ', this.user);
  }

  editingForm = this.fb.group({
    name: new FormControl(''),
    surname: new FormControl(''),
    dateBirth: new FormControl<Date | null>(null),
    drivingLicense: new FormControl<driveLicences | null>(null),
    deadLine: new FormControl<Date | null>(null),
    businessName: 'null',
    email: '',
  });

  loadUserData() {
    this.user = JSON.parse(sessionStorage.getItem('user'));
  }
  activateEditMode() {
    this.editMode = !this.editMode;
  }

  // onRowEditInit() {
  //   console.log(`Email: ${this.jsonUser.email}`);
  //   this.clonedUser[this.jsonUser?.email as string] = { ... this.jsonUser};
  //   console.log('ClonedUser: ', this.clonedUser);
  // }

  onRowEditSave(user: any) {
    console.log('User modificato: ', user);
    this.proceedEditing();

  }
  proceedEditing() {
    const tempDate = new Date(this.editingForm.value.dateBirth);
    const tempDate2 = new Date(this.editingForm.value.deadLine);
    this.editingForm.patchValue({ dateBirth: tempDate });
    this.editingForm.patchValue({ deadLine: tempDate2 });
    this.editingForm.patchValue({ email: this.user.email });
    const { deadLine, ...rest } = this.editingForm.value;
    const toSend = {
      ...rest,
      dateBirth: this.datePipe.transform(rest.dateBirth, 'yyyy-MM-dd'),
      drivingLicense: {
        type: rest.drivingLicense,
        deadLine: this.datePipe.transform(this.editingForm.value.deadLine, 'yyyy-MM-dd'),
      },
    };
    this.user = toSend;
    console.log('ToSend form: ', toSend);
    this.userService.EditUser(toSend).subscribe((res) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Subscription Updated',
      });
      sessionStorage.removeItem('user');
      sessionStorage.setItem('user', JSON.stringify(toSend));
    });
    return this.user;
  }
  onRowEditCancel(){
    this.editMode = false;
    this.messageService.add({
      severity: 'info',
      summary: 'Info',
      detail: 'Subscription Cancelled',
    });
    this.loadUserData();
  }
}
