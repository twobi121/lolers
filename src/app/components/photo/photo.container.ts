import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {User} from '../../interfaces/user';
import {Observable, Subscription} from 'rxjs';
import {Photo} from '../../interfaces/photo';
import {selectLoggedUser, selectUser} from '../../store/users/selectors';
import {State} from '../../store/states/app.state';
import {Store} from '@ngrx/store';
import {
  DeletePhotoAction,
  GetCurrentAlbumAction,
  SetAlbumPreviewAction, SetLikeAction,
  SetSelectedPhotoAction,
  SwitchPhotoAction, UnsetSelectedPhotoAction
} from '../../store/media/actions';
import {Album} from '../../interfaces/album';
import {
  selectAlbums,
  selectAlbumUpdatedStatus,
  selectCurrentAlbum,
  selectDeleteStatus,
  selectPhotos,
  selectSelectedPhoto
} from '../../store/media/selectors';
import {Preview} from '../../interfaces/preview';



@Component({
  selector: 'app-photo-container',
  template: `<app-photo (setSelectedPhotoEmitter)="setSelectedPhoto()"
                        (switchPhotoEmitter)="switchPhoto($event)"
                        (deletePhotoEmitter)="deletePhoto($event)"
                        (setAlbumPreviewEmitter)="setPreview($event)"
                        (closePhotoEmitter)="closePhoto($event)"
                        (setLikeEmitter)="setLike($event)"
                        [user]="user$ | async"
                        [loggedUser]="loggedUser$ | async"
                        [photos]="photos$ | async"
                        [albums]="albums$ | async"
                        [selectedPhoto]="selectedPhoto$ | async"
                        [currentAlbum]="currentAlbum$ | async"
                        [deleteStatus]="deleteStatus$ | async"
                        [albumUpdateStatus]="albumUpdateStatus$ | async"></app-photo>`,
  styleUrls: ['./photo.component.css']
})

export class PhotoContainer {
  user$: Observable<User> = this.store.select(selectUser);
  loggedUser$: Observable<User> = this.store.select(selectLoggedUser);
  photos$: Observable<Photo[]> = this.store.select(selectPhotos);
  albums$: Observable<Album[]> = this.store.select(selectAlbums);
  selectedPhoto$: Observable<Photo> = this.store.select(selectSelectedPhoto);
  currentAlbum$: Observable<Album> = this.store.select(selectCurrentAlbum);
  deleteStatus$: Observable<boolean> = this.store.select(selectDeleteStatus);
  albumUpdateStatus$: Observable<boolean> = this.store.select(selectAlbumUpdatedStatus);
  subs: Subscription[] = [];

  constructor(
    private store: Store<State>,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  setSelectedPhoto() {
    this.subs.push(
      this.route.paramMap.subscribe((params: ParamMap) => {
        this.store.dispatch(new SetSelectedPhotoAction(params.get('photo')));
      }));
  }

  switchPhoto(event: string) {
    this.store.dispatch(new SwitchPhotoAction(event));
  }

  deletePhoto(id: number) {
    this.store.dispatch(new DeletePhotoAction(id));
  }

  setPreview(preview: Preview) {
   this.store.dispatch(new SetAlbumPreviewAction(preview));
  }

  closePhoto(filename: string) {
    this.store.dispatch(new UnsetSelectedPhotoAction());
    this.router.navigateByUrl(this.router.url.replace(filename,  ''));
  }

  setLike(id: number) {
    this.store.dispatch(new SetLikeAction(id));
  }
}
