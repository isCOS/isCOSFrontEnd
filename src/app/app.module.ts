import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimengModule } from 'src/primeng.module';
import { DialogModule } from 'primeng/dialog';
import { LoginComponent} from './login/login.component';
import { GlobeComponent } from './globes/globe/globe.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { GestioneComponent } from './gestione/gestione.component';
import { ReactiveFormsModule } from '@angular/forms';
import { WorkingGlobeComponent } from './globes/working-globe/working-globe.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';
import { ManagerAccountComponent } from './managementSystem/manager-account/manager-account.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GlobeComponent,
    RegisterComponent,
    HomeComponent,
    GestioneComponent,
    WorkingGlobeComponent,
    ManagerAccountComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    PrimengModule,
    ReactiveFormsModule,  
    DialogModule,
    HttpClientModule
  ],
  providers: [
    HttpClient,
    DatePipe,
    MessageService
  ],
  bootstrap: [AppComponent],
  exports: [

  ]
})
export class AppModule { }