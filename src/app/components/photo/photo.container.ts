import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Params, Router} from '@angular/router';
import {DataService} from '../../services/data-service';
import {User} from '../../interfaces/user';
import {UserService} from '../../services/user.service';
import { Location } from '@angular/common';
import {Observable, Subscription} from 'rxjs';
import {Photo} from '../../interfaces/photo';
import {selectLoggedUser, selectUser} from '../../store/users/selectors';
import {State} from '../../store/states/app.state';
import {Store} from '@ngrx/store';
import {SwitchPhotoAction} from '../../store/media/actions';
import {Album} from '../../interfaces/album';



@Component({
  selector: 'app-photo-container',
  template: `<app-photo (switchPhotoEmitter)="switchPhoto($event)"
                        (deletePhotoEmitter)="deletePhoto()"
                        (setAlbumPreviewEmitter)="setPreview()"
                        [user]="user$ | async"
                        [loggedUser]="loggedUser$ | async"
                        [photos]="photos$ | async"
                        [albums]="albums$ | async"
                        [selectedPhoto]="selectedPhoto$ | async"
                        [currentAlbum]="currentAlbum$ | async"
                        [deleteStatus]="deleteStatus$ | async"></app-photo>`,
  styleUrls: ['./photo.component.css']
})

export class PhotoContainer implements OnInit {
  user$: Observable<User> = this.store.select(selectUser);
  loggedUser$: Observable<User> = this.store.select(selectLoggedUser);
  photos$: Observable<Photo[]> = this.store.select(selectPhotos);
  albums$: Observable<Album[]> = this.store.select(selectAlbums);
  selectedPhoto$: Observable<Photo> = this.store.select(selectSelectedPhoto);
  currentAlbum$: Observable<Album> = this.store.select(selectCurrentAlbum);
  deleteStatus$: Observable<boolean> = this.store.select(selectDeleteStatus);


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<State>
  ) { }

  ngOnInit() {
  }


  switchPhoto(event: string) {
    this.store.dispatch(new SwitchPhotoAction(event));
    this.router.navigateByUrl(this.router.url.replace(this.selectedPhoto.filename,  this.photos[idx - 1].filename));
  }

  closePhoto(event: any ) {
    const target = event.target.className;
    if (target === 'fas fa-times close_btn' || target === 'upload_modal_overlay' ) {
      this.router.navigateByUrl(this.router.url.replace(this.selectedPhoto.filename,  '/'));
    }
    event.stopPropagation();
  }

  deletePhoto() {
    this.store.dispatch(new DeletePhotoAction());
  }

  setPreview() {
   this.store.dispatch(new SetAlbumPreviewAction());
  }

}
