import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DialogsService } from 'src/app/service/dialogs.service';
import { userService } from 'src/app/service/user.service';

export function passwordMatchValidator(c: AbstractControl) {
  if (!c.get('newPassword').value || !c.get('confirmNewPassword').value) {
    return null;
  }
  if (c.get('newPassword').value !== c.get('confirmNewPassword').value) {
    return { passwordMismatch: true };
  }
  return null;
}

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit{
  constructor(
    private fb: FormBuilder,
    private userService: userService,
    private messageService: MessageService,
    private dialogService: DialogsService
  ) {}

  emailRegex: any = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  changePasswordDialog: boolean = false;

  ngOnInit(): void {
    this.dialogService.currentChangePasswordDialog.subscribe(
      (changePasswordDialog) =>
        (this.changePasswordDialog = changePasswordDialog)
    );
  }

  changePasswordForm = this.fb.group(
    {
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(this.emailRegex),
        ])
      ),
      oldPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required),
      confirmNewPassword: new FormControl('', Validators.required),
    },
    { validator: passwordMatchValidator }
  );

  sendChangePasswordRequest() {
    sessionStorage.setItem('email', this.changePasswordForm.value.email);
    this.userService
      .changePasswordRequest(this.changePasswordForm.value)
      .subscribe((res) => {
        console.log(res);
        if (res.code === 0) {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Controlla la mail per confermare il cambio password',
          });
          this.dialogService.changePasswordFormDialog(false);
          this.dialogService.changeConfirmPasswordFormDialog(true);
        }
      });
  }
}
