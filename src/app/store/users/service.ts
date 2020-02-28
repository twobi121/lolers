import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../interfaces/user';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {IsFriend} from '../../interfaces/isFriend';
import {constants} from '../../shared/constants/constants';


@Injectable()
export class Service {
  userUrl = constants.userUrl;
  mediaUrl = constants.mediaUrl;
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
        map( response => response)
      );
  }
}
