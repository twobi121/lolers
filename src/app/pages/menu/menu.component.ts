import {Component, Input} from '@angular/core';
import {HeroService} from '../../services/hero.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  @Input() isAuth: boolean;
  @Input() login: string;


  constructor(private heroService: HeroService) { }


  logout() {
    this.heroService.logout();
  }
}
