import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {User} from '../../interfaces/user';
import {Observable, Subscription} from 'rxjs';
import {selectUsersList} from '../../store/users/selectors';
import {Store} from '@ngrx/store';
import {State} from '../../store/states/app.state';
import {GetUsersAction} from '../../store/users/actions';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-users-container',
  template: `<app-users (changePageEmitter)="changePage($event)"
                        (setSortEmitter)="setSort($event)"
                        (searchEmitter)="search($event)"
                        (setListNumberEmitter)="setListNumber($event)"
                        [users]="users$ | async"
                        [listNumber]="listNumber"
                        [currentPage]="page"
                        [sortValue]="sortValue"
                        [searchValue]="searchValue"
                        ></app-users>`,
  styleUrls: ['./users.component.scss']
})
export class UsersContainer implements OnInit, OnDestroy {
  users$: Observable<User[]> = this.store.select(selectUsersList);
  listNumber: number;
  page: number;
  searchValue: string;
  sortValue: string;
  totalUsers: number;
  subs: Subscription[] = [];
  constructor(private store: Store<State>,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getParams();
    this.getUsers();
    this.subs.push(
      this.users$.subscribe(users => {
      if (users && users.length) {
        this.totalUsers = users[0].totalCount;
      }
    }));
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  getParams() {
    this.subs.push(
      this.route.queryParams
        .subscribe(params => {
          this.listNumber = +params.list || 5;
          this.page = +params.page || 1;
          this.sortValue = params.sort || 'name';
          this.searchValue = params.search || '';
        } ));
  }

   getUsers(): void {
    this.store.dispatch(new GetUsersAction({total: this.totalUsers,
       value: this.searchValue,
       sort: this.sortValue, number: this.listNumber, page: this.page
    }));
    this.router.navigate([], {queryParams: {list: this.listNumber, page: this.page, sort: this.sortValue, search: this.searchValue}});
  }

  setListNumber(value: number) {
    this.listNumber = value;
  }

  setSort(value: string) {
    this.sortValue = value;
    this.getUsers();
  }

  search(value: string) {
    this.searchValue = value;
    this.page = 1;
    this.getUsers();
  }

  changePage(page: number) {
    this.page = page;
    this.getUsers();
  }

}
