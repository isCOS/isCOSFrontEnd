import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimengModule } from 'src/primeng.module';

import { LoginComponent} from './login/login.component';
import { GlobeComponent } from './globe/globe.component';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GlobeComponent,
    RegisterComponent,
  ],
  imports: [
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