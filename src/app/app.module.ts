import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimengModule } from 'src/primeng.module';

import { LoginComponent} from './login/login.component';
import { GlobeComponent } from './globe/globe.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ConfirmRegistrationComponent } from './confirm-registration/confirm-registration.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GlobeComponent,
    RegisterComponent,
    HomeComponent,
    ConfirmRegistrationComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    PrimengModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent],
  exports: [

  ]
})
export class AppModule { }