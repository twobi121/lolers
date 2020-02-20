import {Injectable} from '@angular/core';
import {Hero} from '../hero';
import {Observable} from 'rxjs';
import {HttpClient, HttpEvent, HttpResponse} from '@angular/common/http';
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
        tap((data: Data) => {
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
    this.http.get(this.userUrl + 'user')
      .pipe(
        tap((data: Data) => {
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

  uploadAvatar(file: any): Observable<HttpEvent<object>> {
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

  uploadPhoto(file: File, albumId?: string): Observable<HttpEvent<object>> {
    const uploadData = new FormData();
    uploadData.append('file', file, file.name);
    return this.http.post(this.mediaUrl + 'uploadPhoto/' + albumId, uploadData, {
      reportProgress: true,
      observe: 'events'
    })
      .pipe (
        map( event => event)
      );
  }

  getAlbum(id: string): Observable<[]> {
    return this.http.get<any>(this.mediaUrl + 'album/' + id)
      .pipe(
        map(album => album)
      );
  }

  getAlbumsWithPhotos(id: string): Observable<[]> {
    return this.http.get<any>(this.mediaUrl + 'albums_photos/' + id)
      .pipe(
        map(albums => albums)
      );
  }


  getAlbums(id: string): Observable<[]> {
    return this.http.get<any>(this.mediaUrl + 'albums/' + id)
      .pipe(
        map(albums => albums)
      );
  }

  createAlbum(value: any): Observable<HttpResponse<object>> {
    return this.http.post(this.mediaUrl + 'create', value, {observe: 'response'})
    .pipe (
      map( response => response)
    );
  }

  deleteAlbum(id: string): Observable<HttpResponse<object>> {
    return this.http.delete(this.mediaUrl + 'album/' + id,  {observe: 'response'})
      .pipe (
        map( response => response)
      );
  }

  deletePhoto(id: string): Observable<HttpResponse<object>> {
    return this.http.delete(this.mediaUrl + 'photo/' + id,  {observe: 'response'})
      .pipe (
        map( response => response)
      );
  }

  setPreview(filename, albumId): Observable<HttpResponse<object>> {
    const ids = {filename, albumId};
    return this.http.put(this.mediaUrl + 'preview', ids, {observe: 'response'})
      .pipe (
        map( response => response)
      );
  }

  sendRequest(id: number): Observable<HttpResponse<object>> {
    return this.http.post(this.userUrl + 'request', {id}, {observe: 'response'})
      .pipe (
        map( response => response)
      );
  }

  getRequests(): Observable<any> {
    return this.http.get(this.userUrl + 'requests')
      .pipe (
        map(item => item)
      );
  }

  acceptRequest(id: string): Observable<HttpResponse<object>> {
    return this.http.post(this.userUrl + 'accept', {id}, {observe: 'response'})
      .pipe (
        map( response => response)
      );
  }

  getFriends(login: string) {
    return this.http.get(this.userUrl + login + '/friends')
      .pipe (
        map(item => item)
      );
  }

}


