import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {HttpClient, HttpEvent, HttpResponse} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {LastPhoto} from '../../interfaces/lastPhoto';
import {constants} from '../../shared/constants/constants';
import {Album} from '../../interfaces/album';
import {AlbumsPhotos} from '../../interfaces/albumsPhotos';
import {UploadObject} from '../../interfaces/uploadObject';
import {UploadSuccessAction} from './actions';

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

  deletePhoto(id: number): Observable<HttpResponse<object>> {
    return this.http.delete(this.mediaUrl + 'photo/' + id,  {observe: 'response'})
      .pipe (
        map( response => response)
      );
  }

  setAlbumPreview(obj): Observable<HttpResponse<object>> {
    return this.http.put(this.mediaUrl + 'preview', obj, {observe: 'response'})
      .pipe (
        map( response => response)
      );
  }

  getCurrentAlbum(id: string): Observable<Album> {
    return this.http.get<any>(this.mediaUrl + 'album/' + id)
      .pipe(
        map(album => album)
      );
  }

  deleteAlbum(id: number): Observable<HttpResponse<object>> {
    return this.http.delete(this.mediaUrl + 'album/' + id,  {observe: 'response'})
      .pipe (
        map( response => response)
      );
  }

  getAlbumsWithPhotos(id: number): Observable<AlbumsPhotos> {
    return this.http.get<any>(this.mediaUrl + 'albums_photos/' + id)
      .pipe(
        map(albums => albums)
      );
  }
  getAlbums(id: number): Observable<Album[]> {
    return this.http.get<any>(this.mediaUrl + 'albums/' + id)
      .pipe(
        map(albums => albums)
      );
  }

  upload(obj): Observable<number> {
    const uploadData = new FormData();
    uploadData.append('file', obj.file, obj.file.name);
    return this.http.post(this.mediaUrl + 'uploadPhoto/' + obj.albumId, uploadData, {
      observe: 'response'
    })
      .pipe (
        map( (response: HttpResponse<object>) => {
          // @ts-ignore
          if (response.status === 200) {
            return obj.idx;
          }
        })
      );
  }

  uploadArray(array: any[]): Observable<number> {
    const uploaded = new Subject<number>();
    array.forEach(obj => {
      const uploadData = new FormData();
      uploadData.append('file', obj.file, obj.file.name);

      const sub = this.http.post(this.mediaUrl + 'uploadPhoto/' + obj.albumId, uploadData, {
        observe: 'response'
      }).subscribe((response: HttpResponse<object>) => {
        if (response.status === 200) {
          uploaded.next(obj.idx);
        }
        sub.unsubscribe();
      });
    });
    return uploaded;
  }

}
