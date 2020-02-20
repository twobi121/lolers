import { Component, OnInit } from '@angular/core';
import {HeroService} from '../../services/hero.service';
import {ActivatedRoute} from '@angular/router';
import {Hero} from '../../hero';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  friends: Object;
  url = 'http://localhost:8000/';
  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getFriends();
  }

  getFriends() {
    // @ts-ignore
    const friends = this.heroService.getFriends(this.route.params.value.login);
    friends.subscribe(item => this.friends = item);
  }

}
