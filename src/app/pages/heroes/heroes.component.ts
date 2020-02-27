import { Component, OnInit } from '@angular/core';
import {User} from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Observable<User[]>;


  constructor(private heroService: UserService) {

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
