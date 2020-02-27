import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable} from '@angular/core';
import {UserService} from '../services/user.service';



@Injectable({providedIn: 'root'})

export class MainPageGuard implements CanActivate {


  constructor(private heroService: UserService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): UrlTree | boolean  {
    if (!localStorage.getItem('authUserToken')) {
      return true;
    } else {
      this.heroService.getUserLogin();
      return false;
    }
  }


}
