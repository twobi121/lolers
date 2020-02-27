import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {map} from 'rxjs/operators';


@Injectable()
export class Service {
  mediaUrl = 'http://localhost:8000/media/';

  constructor(
      private http: HttpClient,
    ) { }

  uploadAvatar(file: File): Observable<HttpResponse<object>> {
    const uploadData = new FormData();
    uploadData.append('file', file, file.name);
    return this.http.post(this.mediaUrl + 'uploadAvatar', uploadData, {observe: 'response'})
      .pipe (
        map( response => response)
      );
  }
}
