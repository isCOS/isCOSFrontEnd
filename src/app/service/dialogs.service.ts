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

  constructor() { }

  changeEditMode(mode: boolean) {
    this.editModeSource.next(mode);
  }

  changeConfirmDialog(mode: boolean) {
    this.showConfirmDialogSource.next(mode);
  }

}
