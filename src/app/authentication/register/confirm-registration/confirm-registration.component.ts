import { Component, OnInit } from '@angular/core';
import { userService } from 'src/app/service/user.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DialogsService } from 'src/app/service/dialogs.service';

@Component({
  selector: 'app-confirm-registration',
  templateUrl: './confirm-registration.component.html',
  styleUrls: ['./confirm-registration.component.scss'],
})
export class ConfirmRegistrationComponent implements OnInit {
  confirmCode: string | undefined;
  confirmEmailForm: FormGroup | undefined;
  confirmAccountDialog: boolean = false;
  constructor(
    private userService: userService,
    private messageService: MessageService,
    private router: Router,
    private dialogsService: DialogsService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.confirmEmailForm = new FormGroup({
      confirmCode: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
    this.dialogsService.currentConfirmDialog.subscribe(
      (confirmAccountDialog) =>
        (this.confirmAccountDialog = confirmAccountDialog)
    );
  }

  confirmEmail() {
    const email = sessionStorage.getItem('email');
    this.userService
      .verifyEmail(email, this.confirmEmailForm.value.confirmCode)
      .subscribe((data: any) => {
        console.log(data.message);
        if ((data.message = 'Success')) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Your account has been verified',
          });
          sessionStorage.removeItem('email');
          this.dialogsService.changeConfirmDialog(false); // Close the dialog
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Your account has not been verified',
          });
        }
      });
  }
}
