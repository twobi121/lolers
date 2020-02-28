import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {LastPhoto} from '../../interfaces/lastPhoto';
import {constants} from '../../shared/constants/constants';

@Injectable()
export class Service {
  mediaUrl = constants.mediaUrl;

  constructor(
      private http: HttpClient,
    ) { }

  getLastPhotos(id): Observable<LastPhoto[]> {
    return this.http.get<any>(this.mediaUrl + 'lastphotos/' + id)
      .pipe(
        map(photos => photos)
      );
  }
}
