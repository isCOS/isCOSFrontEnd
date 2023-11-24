import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { userService } from '../../service/user.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { TreeNode } from 'primeng/api';
import { DialogsService } from '../../service/dialogs.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('leaveRight', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-100%)' }),
        animate(
          '800ms ease-in-out',
          style({ opacity: 1, transform: 'translateX(0)' })
        ),
      ]),
      transition(':leave', [
        animate(
          '800ms ease-in-out',
          style({ opacity: 0, transform: 'translateX(100%)' })
        ),
      ]),
    ]),
  ],
})
export class LoginComponent implements OnInit {
  showBox: boolean = true;
  nodes: TreeNode[] | undefined;

  @Output() toggle = new EventEmitter<void>();
  emailRegex: any = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  value: string | undefined;
  userdata: any;
  changePasswordDialog: boolean = false;
  confirmChangePasswordDialog: boolean = false;

  ngOnInit(): void {
    
  }

  onToggle() {
    this.toggle.emit();
    this.showBox = !this.showBox;
  }
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: userService,
    private dialogService: DialogsService,
    private messageService: MessageService,
    private router: Router
  ) {}
  form = this.fb.group({
    email: new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.pattern(this.emailRegex),
      ])
    ),
    password: new FormControl('', Validators.required),
  });

  sendLoginRequest() {
    console.log(this.form.value);
    this.form.reset();
  }
  checkCorrectPassword() {
    this.userService.ProceedLogin(this.form.value).subscribe(
      (res) => {
        this.userdata = res;
        sessionStorage.setItem('email', this.userdata.data.email);
        sessionStorage.setItem('token', this.userdata.data.token);
        sessionStorage.setItem('user', JSON.stringify(this.userdata.data));
        this.router.navigate(['/gestione']);
      },
      (error) => {
        if (error.status === 404) {
          this.messageService.add({
            severity: 'error',
            summary: 'Errore',
            detail: 'User not found',
          });
        }
        if (error.status === 400) {
          this.messageService.add({
            severity: 'error',
            summary: 'Errore',
            detail: 'Wrong password',
          });
        }
      }
    );
  }
  
}
