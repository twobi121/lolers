import {Injectable} from '@angular/core';
import {User} from '../interfaces/user';
import {Observable} from 'rxjs';
import {HttpClient, HttpEvent, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Data} from '@angular/router';
import {map, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {error} from 'util';
import {DataService} from './data-service';
import {IsFriend} from '../interfaces/isFriend';

@Injectable({
  providedIn: 'root',
})

export class UserService {
  userUrl = 'http://localhost:8000/users/';
  mediaUrl = 'http://localhost:8000/media/';
  user: User;

  constructor(
    private http: HttpClient,
    private router: Router,
    private dataService: DataService,
    private route: ActivatedRoute) {
  }

  getHeroes(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl);
  }

  getHero(login: string): Observable<User> {
    return this.http.get<User>(this.userUrl + login);
  }

  addHero(user: User): Observable<HttpResponse<object>> {
    return this.http.post(this.userUrl + 'add', user, {observe: 'response'})
      .pipe(
        map(response => response
        ));
  }

  login(loginData: Data): Data {
    return this.http.post(this.userUrl + 'login', loginData)
      .pipe(
        map((data: Data) => data )
      );
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

  uploadAvatar(file: any): Observable<HttpResponse<object>> {
    const uploadData = new FormData();
    uploadData.append('file', file, file.name);
    return this.http.post(this.mediaUrl + 'uploadAvatar', uploadData, {observe: 'response'})
      .pipe (
        map( response => response)
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

  getIsFriend(login: string): Observable<IsFriend> {
    return this.http.get<IsFriend>(this.userUrl + login + '/isFriend');
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

  declineRequest(id: string): Observable<HttpResponse<object>> {
    return this.http.post(this.userUrl + 'decline', {id}, {observe: 'response'})
      .pipe (
        map( response => response)
      );
  }

  getFriends(login: string): Observable<object> {
    return this.http.get(this.userUrl + login + '/friends')
      .pipe (
        map(item => item)
      );
  }

  deleteFriend(id: string): Observable<HttpResponse<object>> {
    return this.http.post(this.userUrl + 'unfriend', {id}, {observe: 'response'})
      .pipe (
        map( response => response)
      );
  }

  updateAlbum(object: object) {
    return this.http.put(this.mediaUrl + 'album', object, {observe: 'response'})
      .pipe (
        map( response => response)
      )
      .subscribe();
  }
}


