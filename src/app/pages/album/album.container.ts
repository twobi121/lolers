import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {User} from '../../interfaces/user';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {selectLoggedUser, selectUser} from '../../store/users/selectors';
import {State} from '../../store/states/app.state';
import {Store} from '@ngrx/store';
import {Album} from '../../interfaces/album';
import {selectAlbumDeleteStatus, selectCurrentAlbum} from '../../store/media/selectors';
import {DeleteAlbumAction, GetCurrentAlbumAction, SetBlobsAction, SetSelectedFilesAction} from '../../store/media/actions';
import {DomSanitizer} from '@angular/platform-browser';
import {GetUserAction} from '../../store/users/actions';
import {Blob} from '../../interfaces/blob';

@Component({
  selector: 'app-album-container',
  template: `<app-album (getCurrentUserEmitter)="getCurrentUser()"
                        (onFileChangedEmitter)="onFileChanged($event)"
                        (deleteAlbumEmitter)="deleteAlbum($event)"
                        [user]="user$ | async"
                        [loggedUser] = "loggedUser$ | async"
                        [currentAlbum]="currentAlbum$ | async"
                        [albumDeleteStatus]="albumDeleteStatus$ | async"></app-album>`,
  styleUrls: ['./album.component.css']
})
export class AlbumContainer implements OnInit, OnDestroy {
  user$: Observable<User> = this.store.select(selectUser);
  loggedUser$: Observable<User> = this.store.select(selectLoggedUser);
  currentAlbum$: Observable<Album> = this.store.select(selectCurrentAlbum);
  albumDeleteStatus$: Observable<boolean> = this.store.select(selectAlbumDeleteStatus);
  selectedFiles: FileList[] = [];
  blobs: Blob[] = [];
  subs: Subscription[] = [];

  constructor(private store: Store<State>,
              private route: ActivatedRoute,
              private router: Router,
              private sanitizer: DomSanitizer
              ) { }

  ngOnInit(): void {
    this.getAlbum();
  }

  ngOnDestroy(): void {
    this.subs.forEach(item => item.unsubscribe());
  }

  getAlbum(): void {
    this.subs.push(
      this.route.paramMap.subscribe((params: ParamMap) => {
        this.store.dispatch(new GetCurrentAlbumAction(params.get('album_id')));
      })
    );
  }

  getCurrentUser() {
    this.subs.push(
      this.route.paramMap.subscribe((params: ParamMap) => {
        this.store.dispatch(new GetUserAction(params.get('login')));
      })
    );
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
      this.router.navigateByUrl('user/' + this.route.snapshot.params.login + `/albums/upload`);
    }
  }

  deleteAlbum($event: number) {
    this.store.dispatch(new DeleteAlbumAction($event));
    this.router.navigateByUrl('user/' + this.route.snapshot.params.login + `/albums`);
  }

}
