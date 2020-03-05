import {Component} from '@angular/core';
import {SafeUrl} from '@angular/platform-browser';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {State} from '../../store/states/app.state';
import {selectAlbums, selectBlobs, selectCurrentAlbum, selectSelectedFiles} from '../../store/media/selectors';
import {Album} from '../../interfaces/album';
import {UploadObject} from '../../interfaces/uploadObject';
import {GetAlbumsAction, UploadAction} from '../../store/media/actions';
import {selectLoggedUser} from '../../store/users/selectors';
import {User} from '../../interfaces/user';
import {Blob} from '../../interfaces/blob';


@Component({
  selector: 'app-upload-container',
  template: `
    <app-upload (uploadEmitter)="upload($event)"
                (getAlbumsEmitter)="getAlbums($event)"
                [selectedFiles]="selectedFiles$ | async"
                [blobs]="blobs$ | async"
                [albums]="albums$ | async"
                [currentAlbum]="currentAlbum$ | async"
                [loggedUser] = "loggedUser$ | async"></app-upload>`,
  styleUrls: ['./upload.component.css']
})

export class UploadContainer {
  selectedFiles$: Observable<FileList[]> = this.store.select(selectSelectedFiles);
  blobs$: Observable<Blob[]> = this.store.select(selectBlobs);
  albums$: Observable<Album[]> = this.store.select(selectAlbums);
  currentAlbum$: Observable<Album> = this.store.select(selectCurrentAlbum);
  loggedUser$: Observable<User> = this.store.select(selectLoggedUser);
  constructor(
    private store: Store<State>
  ) { }

  getAlbums(id: number): void {
    this.store.dispatch(new GetAlbumsAction(id));
  }

  upload(obj) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < obj.files.length; i++) {
      const uploadObject = {file: obj.files[i], albumId: obj.albumId, idx: i};
      this.store.dispatch(new UploadAction(uploadObject));
    }
      // const loading = this.heroService.uploadPhoto(this.selectedFiles[i], this.selectedValue);
      // this.subs.push(loading.subscribe(event => {
      //   // @ts-ignore
      //   if (event instanceof HttpResponse && event.body === 'Файл загружен') {
      //     this.loading.push(this.blobs[i]);
      //   }
      // }));
    }
}
