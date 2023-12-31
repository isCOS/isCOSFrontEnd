import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { DialogsService } from '../service/dialogs.service';

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
    private dialogService: DialogsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.dialogService.currentEditMode.subscribe(editMode => this.editMode = editMode);
    // console.log('User session storage: ', this.user);
  }

  openDialog(dialogName: string) {
    this.currentDialog = dialogName;
  }

  setEditMode(value: boolean) {
    this.dialogService.changeEditMode(value);
    this.loadUserData();
  }

  setVehicleEditMode(value: number) {
    this.dialogService.changeEditVehicleView(value);
  }

  setAddVehicleView(value: boolean) {
    this.dialogService.changeAddVehicleView(value);
  }

  loadUserData() {
    this.user = JSON.parse(sessionStorage.getItem('user'));
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
