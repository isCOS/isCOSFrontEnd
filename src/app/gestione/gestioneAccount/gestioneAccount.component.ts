import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { userService } from '../../service/user.service';
import { MessageService } from 'primeng/api';

interface driveLicences {
  name: string;
}

@Component({
  selector: 'app-gestione-account',
  templateUrl: './gestioneAccount.component.html',
  styleUrls: ['./gestioneAccount.component.scss'],
})
export class GestioneAccountComponent {
  showContinueButton = false;
  driveLicences: driveLicences[] | undefined;
  selectedDriveLicence: driveLicences | undefined;
  @Output() toggle = new EventEmitter<void>();
  emailRegex: any = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  value: string | undefined;
  user: any;
  userEmail: any;
  clonedUser: { [s: string]: any } = {};
  constructor(
    private userService: userService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.userEmail = localStorage.getItem('userEmail');
    this.userService.GetUser(this.userEmail).subscribe((res) => {
      this.user = res;
    });
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
    return this.user;
  }

  loadUserData() {
    this.userService.GetUser(this.userEmail).subscribe((res) => {
      this.user = res;
    });
  }

  onRowEditInit(user: any) {
    this.clonedUser[user.email as string] = { ...user };
  }

  onRowEditSave(user: any) {
    //Needs to implement EditUser
    this.userService.EditUser(user).subscribe(res => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Subscription Updated' });
    });
    this.loadUserData();
  }

  onRowEditCancel(user: any, index: number) {
    this.user[index] = this.clonedUser[user.email as string];
    delete this.clonedUser[user.email as string];
    this.loadUserData();
  }
}
