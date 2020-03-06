import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../interfaces/user';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {IsFriend} from '../../interfaces/isFriend';
import {constants} from '../../shared/constants/constants';
import {Friend} from '../../interfaces/friend';
import {Data} from '@angular/router';
import {LoginData} from '../../interfaces/loginData';


@Injectable()
export class Service {
  userUrl = constants.userUrl;
  mediaUrl = constants.mediaUrl;
  constructor(
      private http: HttpClient,
    ) { }

  // tslint:disable-next-line:variable-name
  getUsers(obj: object): Observable<User[]> {
    // @ts-ignore
    return this.http.post(this.userUrl, obj)
      .pipe(
        map(users => users)
      );
  }

  getUser(login: string): Observable<User> {
    return this.http.get<User>(this.userUrl + login);
  }

  getLoggedUser(): Observable<User> {
    return this.http.get<User>(this.userUrl + 'loggedUser');
  }

  getIsFriend(login: string): Observable<IsFriend> {
    return this.http.get<IsFriend>(this.userUrl + login + '/isFriend');
  }

  logout(): Observable<HttpResponse<object>> {
    return this.http.post(this.userUrl + 'logout', null, {observe: 'response'})
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

  acceptRequest(id: string): Observable<string> {
    return this.http.post(this.userUrl + 'accept', {id}, {observe: 'response'})
      .pipe (
        map( response => {
          if (response.status === 200) {
            return id;
          }
        })
      );
  }

  declineRequest(id: string): Observable<string> {
    return this.http.post(this.userUrl + 'decline', {id}, {observe: 'response'})
      .pipe (
        map( response => {
          if (response.status === 200) {
            return id;
          }
        })
      );
  }

  uploadAvatar(file: File): Observable<HttpResponse<object>> {
    const uploadData = new FormData();
    uploadData.append('file', file, file.name);
    return this.http.post(this.mediaUrl + 'uploadAvatar', uploadData, {observe: 'response'})
      .pipe (
        map( (response: HttpResponse<object>) => response)
      );
  }

  getFriends(login: string): Observable<Friend[]> {
    return this.http.get(this.userUrl + login + '/friends')
      .pipe (
        map((item: Friend[]) => item)
      );
  }

  deleteFriend(id: number): Observable<number> {
    return this.http.post(this.userUrl + 'unfriend', {id})
      .pipe (
        map( () => id)
      );
  }

  login(loginData: LoginData): Data {
    return this.http.post(this.userUrl + 'login', loginData)
      .pipe(
        map((data: Data) => data )
      );
  }

  addUser(user: User): Observable<HttpResponse<object>> {
    return this.http.post(this.userUrl + 'add', user, {observe: 'response'})
      .pipe(
        map(response => response
        ));
  }

  searchUsers(obj: object): Observable<User[]> {
    // @ts-ignore
    return this.http.post(this.userUrl + 'search', obj)
      .pipe(
        map(users => users)
      );
  }

}
