import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {UserService} from '../../services/user.service';
import {Observable, Subscription} from 'rxjs';
import {User} from '../../interfaces/user';
import {DataService} from '../../services/data-service';
import {selectLoggedUser, selectUser} from '../../store/users/selectors';
import {Store} from '@ngrx/store';
import {State} from '../../store/states/app.state';
import {GetAlbumsWithPhotosAction, GetCurrentAlbumAction, SetBlobsAction, SetSelectedFilesAction} from '../../store/media/actions';
import {Album} from '../../interfaces/album';
import {selectAlbums, selectPhotos, selectSortedPhotos} from '../../store/media/selectors';
import {SortedPhotos} from '../../interfaces/sortedPhotos';
import {Photo} from '../../interfaces/photo';
import {DomSanitizer} from '@angular/platform-browser';
import {GetUserAction} from '../../store/users/actions';
import {Blob} from '../../interfaces/blob';

@Component({
  selector: 'app-albums-container',
  template: `<app-albums (onFileChangedEmitter)="onFileChanged($event)"
                         (getAlbumsEmitter)="getAlbumsWithPhotos($event)"
                         (getCurrentUserEmitter)="getCurrentUser()"
                         [user]="user$ | async"
                         [loggedUser] = "loggedUser$ | async"
                         [albums]="albums$ | async"
                         [sortedPhotos]="sortedPhotos$ | async"
                         [photos]="photos$ | async"
                         ></app-albums>`,
  styleUrls: ['./albums.component.scss']
})
export class AlbumsContainer{
  user$: Observable<User> = this.store.select(selectUser);
  loggedUser$: Observable<User> = this.store.select(selectLoggedUser);
  albums$: Observable<Album[]> = this.store.select(selectAlbums);
  sortedPhotos$: Observable<SortedPhotos[]> = this.store.select(selectSortedPhotos);
  photos$: Observable<Photo[]> = this.store.select(selectPhotos);
  selectedFiles: FileList[] = [];
  blobs: Blob[] = [];
  subs: Subscription[] = [];

  constructor( private store: Store<State>,
               private route: ActivatedRoute,
               private sanitizer: DomSanitizer
              ) { }

  getCurrentUser() {
    this.subs.push(
      this.route.paramMap.subscribe((params: ParamMap) => {
        this.store.dispatch(new GetUserAction(params.get('login')));
      })
    );
  }

  getAlbumsWithPhotos(id: number) {
    this.store.dispatch(new GetAlbumsWithPhotosAction(id));
  }

  onFileChanged($event: any) {
    this.selectedFiles = $event.target.files;
    if (this.selectedFiles.length ) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.selectedFiles.length; i++) {
        const obj = {
          blob: this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.selectedFiles[i])),
          loaded: false
        };
        this.blobs.push(obj);
      }
      this.store.dispatch(new SetBlobsAction(this.blobs));
      this.store.dispatch(new SetSelectedFilesAction(this.selectedFiles));
      // @ts-ignore
      this.router.navigateByUrl(this.route.snapshot._routerState.url + `/albums/upload`);
    }
  }








}
