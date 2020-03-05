import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import {Observable} from 'rxjs';
import {State} from '../../store/states/app.state';
import {Store} from '@ngrx/store';
import {GetUsersAction} from '../../store/users/actions';
import {selectUsersList} from '../../store/users/selectors';

@Component({
  selector: 'app-dashboard-container',
  template: '<app-dashboard [users]="users$ | async"></app-dashboard>',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardContainer implements OnInit {
  users$: Observable<User[]> = this.store.select(selectUsersList);

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.store.dispatch(new GetUsersAction());
  }
}
