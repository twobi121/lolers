import {Injectable} from '@angular/core';
import {Hero} from '../hero';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Data} from '@angular/router';
import {map, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {error} from 'util';
import {DataService} from './data-service';

@Injectable({
  providedIn: 'root',
})

export class HeroService {
  userUrl = 'http://localhost:8000/users/';
  mediaUrl = 'http://localhost:8000/media/';
  hero: Hero;

  constructor(
    private http: HttpClient,
    private router: Router,
    private dataService: DataService,
    private route: ActivatedRoute) {
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.userUrl);
  }

  getHero(login: string): Observable<Hero> {
    return this.http.get<Hero>(this.userUrl + login);
  }

  addHero(hero: {}): Observable<boolean> {
    return this.http.post(this.userUrl + 'add', hero, {observe: 'response'})
      .pipe(
        map(response => {
            if (response.status === 201) {
              this.router.navigateByUrl(`login`);
              return true;
            } else {
              return false;
            }
          }
        ));
  }

  login(loginData: Data) {
    this.http.post(this.userUrl + 'login', loginData)
      .pipe(
        map((data: Data) => {
          if (data.token) {
            this.dataService.changeAuthState(true);
            localStorage.setItem('heroToken', data.token);
            localStorage.setItem('login', data.user.login);
            this.dataService.setLogin(data.user.login);
            this.router.navigateByUrl(`hero/${data.user.login}`);
          }
        }))
      .subscribe(null, e => {
        this.dataService.setAuthError(e.error.error);
      });
  }

  getUserLogin() {
    return this.http.get(this.userUrl + 'user')
      .pipe(
        map((data: Data) => {
          this.router.navigateByUrl(`hero/${data}`);
        })
      )
      .subscribe(null, () => {
        this.dataService.changeAuthState(false);
        this.router.navigateByUrl(`login`);
      });

  }


  logout() {
    this.http.post(this.userUrl + 'logout', null)
      .pipe(
        tap(() => {
          localStorage.removeItem('heroToken');
          localStorage.removeItem('login');
          this.dataService.setLogin('');
          this.dataService.changeAuthState(false);
          this.dataService.changeRegState(false);
          this.router.navigate([this.router.url + '/']);
        })
      )
      .subscribe();
  }

  uploadAvatar(file: any) {
    const uploadData = new FormData();
    uploadData.append('file', file, file.name);
    return this.http.post(this.mediaUrl + 'uploadAvatar', uploadData, {
      reportProgress: true,
      observe: 'events'
    })
      .pipe (
        map( event => event)
      );
  }

  getLastPhotos(id): Observable<[]> {
    return this.http.get<any>(this.mediaUrl + 'lastphotos/' + id)
      .pipe(
        map(photos => photos)
      );
  }

  uploadPhoto(file: File) {
    const uploadData = new FormData();
    uploadData.append('file', file, file.name);
    this.http.post(this.mediaUrl + 'uploadPhoto', uploadData, {
      reportProgress: true,
      observe: 'events'
    })
      .subscribe();
  }

  getAlbum(id: string) {
    return this.http.get<any>(this.mediaUrl + 'albums/' + id)
      .pipe(
        map(album => album)
      )
  }

  getAlbums(id: string) {
    return this.http.get<any>(this.mediaUrl + 'albums/' + id)
      .pipe(
        map(albums => albums)
      )
  }
}


