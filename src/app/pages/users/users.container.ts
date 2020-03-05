import { Component, OnInit } from '@angular/core';
import {User} from '../../interfaces/user';
import {Observable} from 'rxjs';
import {selectUsersList} from '../../store/users/selectors';
import {Store} from '@ngrx/store';
import {State} from '../../store/states/app.state';
import {GetUsersAction, SearchAction} from '../../store/users/actions';

@Component({
  selector: 'app-users-container',
  template: '<app-users (searchEmitter)="search($event)" (getUsersEmitter)="getUsers()" [users]="users$ | async"></app-users>',
  styleUrls: ['./users.component.css']
})
export class UsersContainer implements OnInit {
  users$: Observable<User[]> = this.store.select(selectUsersList);
  constructor(private store: Store<State>) {
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.store.dispatch(new GetUsersAction());
  }

  search(value: string) {
    this.store.dispatch(new SearchAction(value));
  }

}
