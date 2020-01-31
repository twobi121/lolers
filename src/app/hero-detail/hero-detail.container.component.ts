import {Component, OnInit} from '@angular/core';
import {Hero} from '../hero';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {HeroService} from '../services/hero.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-hero-detail-container',
  template: '<app-hero-detail [hero] = "hero$ | async" (onSave)="saveUser($event)"></app-hero-detail>',
  styleUrls: ['./hero-detail.component.css']
})

export class HeroDetailContainerComponent implements OnInit {
  hero$: Observable<Hero>;

  constructor(private route: ActivatedRoute,
              private heroService: HeroService,
              private location: Location
  ) {
  }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.hero$ = this.heroService.getHero(id);
  }

  saveUser(event) {
  }
}
