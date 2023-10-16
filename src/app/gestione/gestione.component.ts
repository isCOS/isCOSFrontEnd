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
  usageDialogVisible: boolean = false;
  contactsDialogVisible: boolean = false;
  currentDialog: string = '';

  openDialog(dialogName: string) {
    this.currentDialog = dialogName;
  }  

  showAccountDialog() {
    this.accountDialogVisible = true;
  }

  showUsageDialog(){
    this.usageDialogVisible = true;
  }

  showContactsDialog(){
    this.contactsDialogVisible = true;
  }

  constructor() { }

}
