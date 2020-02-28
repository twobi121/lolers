import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../interfaces/user';
import {LastPhoto} from '../../interfaces/lastPhoto';
import {State} from '../../store/states/app.state';
import {Store} from '@ngrx/store';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {GetLastPhotosAction, SetBlobsAction, SetSelectedFilesAction} from '../../store/media/actions';
import {selectLastPhotos} from '../../store/media/selectors';
import {FileChangeEvent} from '@angular/compiler-cli/src/perform_watch';

@Component({
  selector: 'app-last-photos-container',
  template: '<app-last-photos [lastPhotos] = "lastPhotos$ | async" [loggedUser] = "loggedUser" [user]="user" (onFileChangedEmitter)="onFileChanged($event)"></app-last-photos>',
  styleUrls: ['./last-photos.component.css']
})
export class LastPhotosContainer implements OnInit {
  @Input() user: User;
  @Input() loggedUser: User;
  lastPhotos$: Observable<LastPhoto[]> = this.store.select(selectLastPhotos);
  selectedFiles: FileList[];
  blobs: SafeUrl[] = [];

  constructor(private store: Store<State>,
              private sanitizer: DomSanitizer,
              private router: Router,
              private route: ActivatedRoute
              ) { }

  ngOnInit() {
    this.store.dispatch(new GetLastPhotosAction(this.user._id));
  }

  onFileChanged($event: any) {
    this.selectedFiles = $event.target.files;
    if (this.selectedFiles.length ) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.blobs.push(this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.selectedFiles[i])));
      }
      this.store.dispatch(new SetBlobsAction(this.blobs));
      this.store.dispatch(new SetSelectedFilesAction(this.selectedFiles));
      // @ts-ignore
      this.router.navigateByUrl(this.route.snapshot._routerState.url + `/albums/upload`);
    }
  }

}
