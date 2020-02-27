import { Component, OnInit } from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {User} from '../../interfaces/user';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {UserService} from '../../services/user.service';
import {DataService} from '../../services/data-service';

@Component({
  selector: 'app-album-container',
  template: '<app-album [album]="album$ | async"  [hero]="hero$ | async" [login] = "login$ | async"></app-album>',
  styleUrls: ['./album.component.css']
})
export class AlbumContainer implements OnInit {

  album$: Observable<object>;
  hero$: Observable<User>;
  url = 'http://localhost:8000/';
  login$: Observable<string>;

  constructor(private route: ActivatedRoute,
              private heroService: UserService,
              private dataService: DataService
              ) { }

  ngOnInit(): void {
    this.getHero();
    this.getAlbum();
    this.login$ = this.dataService.login$;
  }

  getHero(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.hero$ = this.heroService.getHero(params.get('login'));
    });
  }

  getAlbum(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.album$ = this.heroService.getAlbum(params.get('id'));
    });
  }

}
