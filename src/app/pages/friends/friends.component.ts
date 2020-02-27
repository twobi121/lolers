import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../interfaces/user';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  friends: [] = [];
  url = 'http://localhost:8000/';
  subs: Subscription[] = [];
  successStatus = [];
  constructor(
    private heroService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getFriends();
  }

  getFriends() {
    // @ts-ignore
    const friends = this.heroService.getFriends(this.route.params.value.login);
    friends.subscribe(item => {
      // @ts-ignore
      this.friends = item;
    });
  }

  deleteFriend(id: string) {
    const success = this.heroService.deleteFriend(id);
    this.subs.push(success.subscribe(
      response => {
        if (response.status === 200) {
          this.successStatus.push(true);
        }
      }
    ));
  }

}
