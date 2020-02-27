import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../interfaces/user';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {IsFriend} from '../../interfaces/isFriend';

@Injectable()
export class Service {
  userUrl = 'http://localhost:8000/users/';

  constructor(
      private http: HttpClient,
    ) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl);
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
}
