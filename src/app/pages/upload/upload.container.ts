import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {State} from '../../store/states/app.state';
import {selectAlbums, selectBlobs, selectCurrentAlbum, selectSelectedFiles} from '../../store/media/selectors';
import {Album} from '../../interfaces/album';
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
    const filesToUpload = [];
    for (let i = 0; i < obj.files.length; i++) {
      const uploadObject = {file: obj.files[i], albumId: obj.albumId, idx: i};
      filesToUpload.push(uploadObject);
    }
    this.store.dispatch(new UploadAction(filesToUpload));
  }
}
