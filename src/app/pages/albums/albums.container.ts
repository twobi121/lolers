import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {HeroService} from '../../services/hero.service';
import {Observable} from 'rxjs';
import {Hero} from '../../hero';
import {DataService} from '../../services/data-service';

@Component({
  selector: 'app-albums-container',
  template: '<app-albums [albumsPhotos]="albumsPhotos$ | async" [hero]="hero$ | async"></app-albums>',
  styleUrls: ['./albums.component.css']
})
export class AlbumsContainer implements OnInit {
  albumsPhotos$: Observable<{}>;
  hero$: Observable<Hero>;
  url = 'http://localhost:8000/';

  constructor(private route: ActivatedRoute,
              private heroService: HeroService,
              private dataService: DataService) { }

  ngOnInit(): void {
    this.getHero();
    this.getAlbums();
  }

  getHero(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.hero$ = this.heroService.getHero(params.get('login'));
    });
  }

  getAlbums(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.albumsPhotos$ = this.heroService.getAlbums(params.get('id'));
    });
  }

  // getAlbum(): void {
  //   this.route.paramMap.subscribe((params: ParamMap) => {
  //     this.album$ = this.heroService.getAlbum(params.get('id'));
  //   });
  // }







}
