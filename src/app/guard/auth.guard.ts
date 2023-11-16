import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private service: AuthService, private router: Router) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      if (this.service.CheckAuthoritation("umbertocarolini4112@gmail.com", sessionStorage.getItem(sessionStorage.getItem('umbertocarolini4112@gmail.com')))) {
        console.log('SONO DENTRO')
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    }
}
