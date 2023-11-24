import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DialogsService } from 'src/app/service/dialogs.service';
import { userService } from 'src/app/service/user.service';

@Component({
  selector: 'app-confirm-change-password',
  templateUrl: './confirm-change-password.component.html',
  styleUrls: ['./confirm-change-password.component.scss'],
})
export class ConfirmChangePasswordComponent {
  
  email: any;
  
  constructor(
    private fb: FormBuilder,
    private userService: userService,
    private messageService: MessageService,
    private dialogService: DialogsService
  ) {}

  confirmChangePasswordForm = this.fb.group({
    confirmCode: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  confirmChangePassword(){
    const email = sessionStorage.getItem('email');
    this.userService.confirmChangePassword(email, this.confirmChangePasswordForm.value.confirmCode).subscribe((data: any) => {
      console.log(data.message);
      if ((data.message = 'Success')) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Your account has been verified',
        });
        sessionStorage.removeItem('email');
        this.dialogService.changeConfirmPasswordFormView(false);
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
