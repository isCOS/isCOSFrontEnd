import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './authentication/register/register.component';
import { HomeComponent } from './home/home.component';
import { GestioneComponent } from './gestione/gestione.component';
import { NavigatorComponent } from './navigator/navigator.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
{ path: '', component: HomeComponent },
{ path: 'register', component: RegisterComponent },
{ path: 'navigator', component: NavigatorComponent, canActivate: [AuthGuard] },
{ path: 'gestione', component: GestioneComponent, canActivate: [AuthGuard] },
{ path: '', redirectTo: '/', pathMatch: 'full' },
{ path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
