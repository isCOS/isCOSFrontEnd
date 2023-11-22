import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition, query, keyframes } from '@angular/animations';
import { Output, EventEmitter } from '@angular/core';
import { userService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestione',
  templateUrl: './gestione.component.html',
  styleUrls: ['./gestione.component.scss'],
  animations: [
  ]
})
export class GestioneComponent implements OnInit{

  editMode: boolean = false;
  showBox: boolean = true;
  accountDialogVisible: boolean = false;
  vehiclesDialogVisible: boolean = false;
  usageDialogVisible: boolean = false;
  contactsDialogVisible: boolean = false;
  veicleDialogVisible: boolean = false;
  currentDialog: string = '';
  user: any;
  @Output() toggle = new EventEmitter<void>();

  constructor(
    private userService: userService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.userService.GetUser(sessionStorage.getItem('email')).subscribe((res) => {
    //   this.user = res;
    //   console.log('User: ',this.user);
    // });
    this.user = JSON.parse(sessionStorage.getItem('user'));
    console.log('User session storage: ', this.user);
  }

  openDialog(dialogName: string) {
    this.currentDialog = dialogName;
  }

  showVeicleDialog() {
    this.veicleDialogVisible = !this.veicleDialogVisible;
  }

  showAccountDialog() {
    this.accountDialogVisible = !this.accountDialogVisible;
  }

  showVehiclesDialog() {
    this.vehiclesDialogVisible = !this.vehiclesDialogVisible;
  }

  showUsageDialog() {
    this.usageDialogVisible = !this.usageDialogVisible;
  }

  showContactsDialog() {
    this.contactsDialogVisible = !this.contactsDialogVisible;
  }

  visible: boolean = false;

  showDialog() {
    this.visible = true;
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/']);
  }

}
