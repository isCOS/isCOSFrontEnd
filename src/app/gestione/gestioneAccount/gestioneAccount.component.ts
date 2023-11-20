import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { userService } from '../../service/user.service';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

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
  clonedUser: { [s: string]: any } = {};

  constructor(
    private userService: userService,
    private messageService: MessageService,
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
    this.userService
      .GetUser(sessionStorage.getItem('email'))
      .subscribe((res) => {
        this.user = res;
        console.log('User: ', this.user.data);
        this.jsonUser = JSON.stringify(this.user.data);
        this.jsonUser = {
          dateBirth: this.user?.data.dateBirth,
          drivingLicenseDeadLine: this.user?.data.drivingLicense?.deadLine,
          drivingLicenseType: this.user?.data.drivingLicense?.type,
          email: this.user?.data.email,
          name: this.user?.data.name,
          surname: this.user?.data.surname,
          token: 'default',
        };
        console.log('UserSTRING: ', this.jsonUser);
        return this.user;
      });
  }

  loadUserData() {
    this.userService
      .GetUser(sessionStorage.getItem('email'))
      .subscribe((res) => {
        this.user = res;
        console.log('User: ', this.user);
      });
  }

  onRowEditInit() {
    console.log(`Email: ${this.jsonUser.email}`);
    this.clonedUser[this.jsonUser?.email as string] = { ... this.jsonUser};
    console.log('ClonedUser: ', this.clonedUser);
  }

  onRowEditSave(user: any) {
    this.userService.EditUser(user).subscribe((res) => {
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Subscription Updated',
      });
    });
    this.loadUserData();
  }

  onRowEditCancel(user: any, index: number) {
    this.user[index] = this.clonedUser[user?.data.email as string];
    delete this.clonedUser[user.data.email as string];
    this.loadUserData();
  }
}
