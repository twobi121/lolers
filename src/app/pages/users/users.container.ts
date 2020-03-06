import { Component, OnInit } from '@angular/core';
import {User} from '../../interfaces/user';
import {Observable} from 'rxjs';
import {selectUsersList} from '../../store/users/selectors';
import {Store} from '@ngrx/store';
import {State} from '../../store/states/app.state';
import {GetUsersAction} from '../../store/users/actions';

@Component({
  selector: 'app-users-container',
  template: `<app-users (setSortEmitter)="setSort($event)"
                        (getUsersEmitter)="getUsers($event)"
                        (setListNumberEmitter)="setListNumber($event)"
                        [users]="users$ | async"
                        ></app-users>`,
  styleUrls: ['./users.component.css']
})
export class UsersContainer implements OnInit {
  users$: Observable<User[]> = this.store.select(selectUsersList);
  listNumber = 5;
  searchValue: string;
  sortValue = 'name';
  constructor(private store: Store<State>) {
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(value?: string): void {
    if (value) {
      this.searchValue = value;
      this.store.dispatch(new GetUsersAction({value, sort: this.sortValue, number: this.listNumber}));
    } else {
      this.store.dispatch(new GetUsersAction({sort: this.sortValue, number: this.listNumber}));
    }
  }

  // search(value: string) {
  //   this.searchValue = value;
  //   this.store.dispatch(new SearchAction({value, number: this.listNumber}));
  // }

  setListNumber(value: number) {
    this.listNumber = value;
    if (this.searchValue) {
      this.getUsers(this.searchValue);
    } else { this.getUsers(); }
  }

  setSort(value: string) {
    this.sortValue = value;
    if (this.searchValue) {
      this.getUsers(this.searchValue);
    } else { this.getUsers(); }
  }

}
