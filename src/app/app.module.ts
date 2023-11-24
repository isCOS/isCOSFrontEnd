import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimengModule } from 'src/primeng.module';
import { DialogModule } from 'primeng/dialog';
import { LoginComponent} from './authentication/login/login.component';
import { GlobeComponent } from './globes/globe/globe.component';
import { RegisterComponent } from './authentication/register/register.component';
import { HomeComponent } from './home/home.component';
import { GestioneComponent } from './gestione/gestione.component';
import { ReactiveFormsModule } from '@angular/forms';
import { WorkingGlobeComponent } from './globes/working-globe/working-globe.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { ManagerAccountComponent } from './managementSystem/manager-account/manager-account.component';
import { NavigatorComponent } from './navigator/navigator.component';
import { GestioneAccountComponent } from './gestione/gestioneAccount/gestioneAccount.component';
import { AuthGuard } from './guard/auth.guard';
import { ConfirmRegistrationComponent } from './authentication/register/confirm-registration/confirm-registration.component';
// import { ChangePasswordComponent } from './authentication/login/change-password/change-password.component';
// import { ConfirmChangePasswordComponent } from './authentication/confirm-change-password/confirm-change-password.component';
import { ChangePasswordComponent } from './gestione/changePassword/change-password/change-password.component';
import { ConfirmChangePasswordComponent } from './gestione/changePassword/confirm-change-password/confirm-change-password.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GlobeComponent,
    RegisterComponent,
    HomeComponent,
    GestioneComponent,
    WorkingGlobeComponent,
    ManagerAccountComponent,
    NavigatorComponent,
    GestioneAccountComponent,
    ConfirmRegistrationComponent,
    ChangePasswordComponent,
    ConfirmChangePasswordComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    PrimengModule,
    ReactiveFormsModule,  
    DialogModule,
    HttpClientModule,
  ],
  providers: [
    HttpClient,
    DatePipe,
    MessageService,
    AuthGuard
  ],
  bootstrap: [AppComponent],
  exports: [

  ]
})
export class AppModule { }