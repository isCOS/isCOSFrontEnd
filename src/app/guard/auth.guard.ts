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
    const email = sessionStorage.getItem('email') || '';
    // console.log(email)
    const token = sessionStorage.getItem('token') || '';
    // console.log(token)
    return this.service.CheckAuthoritation(email, token).toPromise().then((res) => {
      if (res == "0") {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    });
  }
}
