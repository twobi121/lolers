import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {UserService} from '../../services/user.service';
import {Observable} from 'rxjs';
import {User} from '../../interfaces/user';
import {DataService} from '../../services/data-service';

@Component({
  selector: 'app-albums-container',
  template: '<app-albums [albumsPhotos]="albumsPhotos$ | async" [hero]="hero$ | async" [login] = "login$ | async"></app-albums>',
  styleUrls: ['./albums.component.css']
})
export class AlbumsContainer implements OnInit {
  albumsPhotos$: Observable<{}>;
  hero$: Observable<User>;
  url = 'http://localhost:8000/';
  login$: Observable<string>;

  constructor(private route: ActivatedRoute,
              private heroService: UserService,
              private dataService: DataService) { }

  ngOnInit(): void {
    this.getHero();
    this.getAlbumsWithPhotos();
    this.login$ = this.dataService.login$;
  }

  getHero(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.hero$ = this.heroService.getHero(params.get('login'));
    });
  }

  getAlbumsWithPhotos(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.albumsPhotos$ = this.heroService.getAlbumsWithPhotos(params.get('id'));
    });
  }








}
