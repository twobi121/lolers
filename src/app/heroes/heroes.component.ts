import { Component, OnInit } from '@angular/core';
import {Hero} from '../hero';
import { HeroService } from '../services/hero.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Observable<Hero[]>;


  constructor(private heroService: HeroService) {

  }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroes = this.heroService.getHeroes();
  }

  // removeHero(hero: Hero): void {
  //   this.heroService.removeHeroes(hero);
  // }



}
