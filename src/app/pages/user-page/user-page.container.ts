import {Component, DoCheck, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {HeroService} from '../../services/hero.service';
import {Observable} from 'rxjs';
import {Hero} from '../../hero';

@Component({
  selector: 'app-user-page-container',
  template: '<app-user-page [hero]="hero$ | async" ></app-user-page>',
  styleUrls: ['./user-page.component.css']
})
export class UserPageContainer implements OnInit {

  hero$: Observable<Hero>;
  url = 'http://localhost:8000/';

  constructor(private route: ActivatedRoute,
              private heroService: HeroService) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.hero$ = this.heroService.getHero(params.get('login'));
    });
  }

}
