import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from '../../services/data-service';
import {Observable, Subscription} from 'rxjs';
import {HeroService} from '../../services/hero.service';

@Component({
  selector: 'app-menu-container',
  template: '<app-menu [login]="login$ | async" [isAuth]="isAuth$ | async" ></app-menu>',
  styleUrls: ['./menu.component.css']
})
export class MenuContainer implements OnInit, OnDestroy {

  isAuth$: Observable<boolean>;
  subs: Subscription[];
  login$: Observable<string>;


  constructor(private dataService: DataService,
              private heroService: HeroService) { }

  ngOnInit() {
    this.isAuth$ = this.dataService.isAuth$;
    this.login$ = this.dataService.login$;
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }




}
