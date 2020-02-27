import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {UserService} from '../services/user.service';



@Injectable({providedIn: 'root'})

export class AuthGuard implements CanActivate {


  constructor(private heroService: UserService,
              private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean  {
    if (localStorage.getItem('authUserToken')) {
      return true;
    } else {
      this.router.navigate(['login'], {
        queryParams: {
          auth: false
        }
      })
      return false;
    }
  }


}
