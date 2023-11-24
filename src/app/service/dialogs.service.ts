import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogsService {

  private editModeSource = new BehaviorSubject<boolean>(false);
  currentEditMode = this.editModeSource.asObservable();

  private showConfirmDialogSource = new BehaviorSubject<boolean>(false);
  currentConfirmDialog = this.showConfirmDialogSource.asObservable();

  private showChangePasswordDialogSource = new BehaviorSubject<boolean>(false);
  currentChangePasswordDialog = this.showChangePasswordDialogSource.asObservable();

  private showConfirmChangePasswordDialogSource = new BehaviorSubject<boolean>(false);
  currentConfirmChangePasswordDialog = this.showConfirmChangePasswordDialogSource.asObservable();

  constructor() { }

  changeEditMode(mode: boolean) {
    this.editModeSource.next(mode);
  }

  changeConfirmDialog(mode: boolean) {
    this.showConfirmDialogSource.next(mode);
  }

  changePasswordFormDialog(mode: boolean) {
    this.showChangePasswordDialogSource.next(mode);
  }

  changeConfirmPasswordFormDialog(mode: boolean) {
    this.showConfirmChangePasswordDialogSource.next(mode);
  }

}
