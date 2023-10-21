import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition, query, keyframes } from '@angular/animations';

@Component({
  selector: 'app-gestione',
  templateUrl: './gestione.component.html',
  styleUrls: ['./gestione.component.scss'],
  animations: [
  ]
})
export class GestioneComponent {

  accountDialogVisible: boolean = false;
  vehiclesDialogVisible: boolean = false;
  usageDialogVisible: boolean = false;
  contactsDialogVisible: boolean = false;
  veicleDialogVisible: boolean = false;
  currentDialog: string = '';

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

  constructor() { }

}
