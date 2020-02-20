import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Hero} from '../../hero';
import {HeroService} from '../../services/hero.service';
import {Subscription} from 'rxjs';
import {DataService} from '../../services/data-service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnDestroy{
  subs: Subscription[] = [];
  requestStatus = false;
  @Input() login: string;
  @Input() hero: Hero;

  constructor(
    private heroService: HeroService,
  ) { }


  ngOnDestroy(): void {
    this.subs.forEach(item => item.unsubscribe());
  }

  sendRequest() {
    const response = this.heroService.sendRequest(this.hero._id);
    this.subs.push(response.subscribe(
      item => {
        if (item.status === 200) {
          this.requestStatus = true;
        }
      }
    ));
  }
}
