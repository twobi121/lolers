import {Component, OnInit} from '@angular/core';
import {Hero} from '../../hero';
import {ActivatedRoute} from '@angular/router';
import {HeroService} from '../../services/hero.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-user-edit-container',
  template: '<app-user-edit [hero] = "hero$ | async"></app-user-edit>',
  styleUrls: ['./user-edit.component.css']
})

export class UserEditContainer implements OnInit {
  hero$: Observable<Hero>;

  constructor(private route: ActivatedRoute,
              private heroService: HeroService,
  ) {
  }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const login = this.route.snapshot.paramMap.get('login');
    this.hero$ = this.heroService.getHero(login);
  }

}
