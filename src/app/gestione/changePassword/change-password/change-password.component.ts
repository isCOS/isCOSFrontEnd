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
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit{
  constructor(
    private fb: FormBuilder,
    private userService: userService,
    private messageService: MessageService,
    private dialogService: DialogsService
  ) {}

  emailRegex: any = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  changePasswordView: boolean = false;
  user: any;

  ngOnInit(): void {
    this.dialogService.currentChangePasswordView.subscribe(
      (changePasswordView) =>
        (this.changePasswordView = changePasswordView)
    );
    this.user = JSON.parse(sessionStorage.getItem('user'));
  }

  changePasswordForm = this.fb.group(
    {
      email: '',
      oldPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', Validators.required),
      confirmNewPassword: new FormControl('', Validators.required),
    },
    { validator: passwordMatchValidator }
  );

  sendChangePasswordRequest() {
    this.changePasswordForm.patchValue({
      email: this.user.email,
    });
    // console.log("form change",this.changePasswordForm.value)
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
          this.dialogService.changePasswordFormView(false);
          this.dialogService.changeConfirmPasswordFormView(true);
        }
      });
  }
  
}

