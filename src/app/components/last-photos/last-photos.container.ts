import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Observable} from 'rxjs';
import {User} from '../../interfaces/user';
import {DataService} from '../../services/data-service';

@Component({
  selector: 'app-last-photos-container',
  template: '<app-last-photos [lastPhotos] = "lastPhotos$ | async" [loggedUser] = "loggedUser" [user]="user"></app-last-photos>',
  styleUrls: ['./last-photos.component.css']
})
export class LastPhotosContainer implements OnChanges {
  @Input() user: User;
  @Input() loggedUser: User;
  lastPhotos$: Observable<{}>;

  constructor(private heroService: UserService,
              ) { }


  ngOnChanges(changes: SimpleChanges): void {
    this.lastPhotos$ = this.heroService.getLastPhotos(this.user._id);
  }

}
