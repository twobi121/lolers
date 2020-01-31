import {Injectable} from '@angular/core';
import {Hero} from '../hero';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Data} from '@angular/router';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class HeroService {
  url = 'http://localhost:8000/users/';
  hero: Hero;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.url);
  }

  getHero(id: string): Observable<Hero> {
    return this.http.get<Hero>(this.url + id);
  }

  addHero(hero: {}) {
    this.http.post(this.url + 'add', hero)
      .subscribe();
  }

  login(loginData: Data) {
    return this.http.post(this.url + 'login', loginData)
      .pipe(
        map((data: Data) => {
          if (data.token) {
            localStorage.setItem('heroToken', data.token);
            this.router.navigateByUrl(`hero/${data.user._id}`);
          }
      }, error => console.log(error.error.message) ) )
      .subscribe();
  }

  checkLogin(token: '') {
    this.http.get(this.url + '/check_login')
  }

  // removeHeroes(hero: Hero) {
  //   const idx = HEROES.indexOf(hero);
  //   HEROES.splice(idx, 1);
  // }
  //

}
