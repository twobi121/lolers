import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable} from '@angular/core';
import {HeroService} from '../services/hero.service';



@Injectable({providedIn: 'root'})

export class MainPageGuard implements CanActivate {


  constructor(private heroService: HeroService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): UrlTree | boolean  {
    if (!localStorage.getItem('heroToken')) {
      return true;
    } else {
      this.heroService.getUserLogin();
      return false;
    }
  }


}
