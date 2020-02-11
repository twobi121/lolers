import {Component, Input, OnInit} from '@angular/core';
import {HeroService} from '../../services/hero.service';
import {Observable} from 'rxjs';
import {Hero} from '../../hero';
import {DataService} from '../../services/data-service';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-last-photos-container',
  template: '<app-last-photos [lastPhotos] = "lastPhotos$ | async" [login] = "login$ | async" [hero]="hero"></app-last-photos>',
  styleUrls: ['./last-photos.component.css']
})
export class LastPhotosContainer implements OnInit {
  @Input() hero: Hero;
  login$: Observable<string>;
  lastPhotos$: Observable<{}>;

  constructor(private heroService: HeroService,
              private dataService: DataService,
              ) { }

  ngOnInit() {
    this.login$ = this.dataService.login$;
    this.lastPhotos$ = this.heroService.getLastPhotos(this.hero._id);
  }

}
