import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';



import { PrimengModule } from 'src/primeng.module';

import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrimengModule

  ],
  providers: [
  ],
  bootstrap: [AppComponent],
  exports: [

  ]
})
export class AppModule { }