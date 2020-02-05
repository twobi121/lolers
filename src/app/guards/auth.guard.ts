import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {HeroService} from '../services/hero.service';



@Injectable({providedIn: 'root'})

export class AuthGuard implements CanActivate {


  constructor(private heroService: HeroService,
              private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean  {
    if (localStorage.getItem('heroToken')) {
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
