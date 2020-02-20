import {Component, DoCheck, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {HeroService} from '../../services/hero.service';
import {Observable} from 'rxjs';
import {Hero} from '../../hero';
import {DataService} from '../../services/data-service';

@Component({
  selector: 'app-user-page-container',
  template: '<app-user-page [hero]="hero$ | async" [login] = "login$ | async"></app-user-page>',
  styleUrls: ['./user-page.component.css']
})
export class UserPageContainer implements OnInit {
  login$: Observable<string>;
  hero$: Observable<Hero>;
  url = 'http://localhost:8000/';

  constructor(private route: ActivatedRoute,
              private heroService: HeroService,
              private dataService: DataService) { }

  ngOnInit(): void {
    this.getHero();
    this.login$ = this.dataService.login$;
  }

  getHero(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.hero$ = this.heroService.getHero(params.get('login'));
    });
  }

}
