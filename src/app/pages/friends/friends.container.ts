import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {Friend} from '../../interfaces/friend';
import {Store} from '@ngrx/store';
import {State} from '../../store/states/app.state';
import {DeleteFriendAction, GetFriendsAction, GetUserAction} from '../../store/users/actions';
import {User} from '../../interfaces/user';
import {selectFriends, selectLoggedUser, selectUser} from '../../store/users/selectors';

@Component({
  selector: 'app-friends-container',
  template: `<app-friends (getUserEmitter)="getUser()"
                          (deleteFriendEmitter)="deleteFriend($event)"
                [user]="user$ | async"
                [loggedUser]="loggedUser$ | async"
                [friends]="friends$ | async"></app-friends>`,
  styleUrls: ['./friends.component.scss']
})

export class FriendsContainer implements OnInit {
  user$: Observable<User> = this.store.select(selectUser);
  loggedUser$: Observable<User> = this.store.select(selectLoggedUser);
  friends$: Observable<Friend[]> = this.store.select(selectFriends);
  subs: Subscription[] = [];
  constructor(
    private heroService: UserService,
    private route: ActivatedRoute,
    private store: Store<State>
  ) { }

  ngOnInit(): void {
    this.getFriends();
  }

  getUser() {
    this.subs.push(
      this.route.paramMap.subscribe(
        (params: ParamMap) => this.store.dispatch(new GetUserAction(params.get('login')))
      )
    );
  }

  getFriends() {
    this.subs.push(
      this.route.paramMap.subscribe(
        (params: ParamMap) => this.store.dispatch(new GetFriendsAction(params.get('login')))
      )
    );
  }

  deleteFriend(id: number) {
    this.store.dispatch(new DeleteFriendAction(id));
  }

}
