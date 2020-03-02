import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {User} from '../../interfaces/user';
import {select, Store} from '@ngrx/store';
import {State} from '../../store/states/app.state';
import {GetUserAction, IsFriendAction, SendRequestAction} from '../../store/users/actions';
import {selectLoggedUser, selectUser, selectIsAuth, selectIsFriend, selectRequestStatus} from '../../store/users/selectors';
import {IsFriend} from '../../interfaces/isFriend';

@Component({
  selector: 'app-user-page-container',
  template: '<app-user-page [user]="user$ | async" [isAuth]="isAuth$ | async" [isFriend]="isFriend$ | async" [requestStatus] = "requestStatus$ | async" (requestEvent)="sendRequest($event)" [loggedUser]="loggedUser$ | async"></app-user-page>',
  styleUrls: ['./user-page.component.css']
})
export class UserPageContainer implements OnInit, OnDestroy {
  loggedUser$: Observable<User> = this.store.pipe(select(selectLoggedUser));
  user$: Observable<User> = this.store.pipe(select(selectUser));
  isAuth$: Observable<boolean> = this.store.pipe(select(selectIsAuth));
  isFriend$: Observable<IsFriend> = this.store.pipe(select(selectIsFriend));
  requestStatus$: Observable<boolean> = this.store.pipe(select(selectRequestStatus));
  subs: Subscription[] = [];

  constructor(private route: ActivatedRoute,
              private store: Store<State>,
              ) { }

  ngOnInit(): void {
    this.getUser();
    if (localStorage.getItem('authUserToken')) {
      this.getIsFriend();
    }
  }

  ngOnDestroy(): void {
    this.subs.forEach(item => item.unsubscribe());
  }

  getUser(): void {
    this.subs.push(this.route.paramMap.subscribe((params: ParamMap) => {
      this.store.dispatch(new GetUserAction(params.get('login')));
    }));
  }

  getIsFriend() {
    this.subs.push(this.route.paramMap.subscribe((params: ParamMap) => {
      this.store.dispatch(new IsFriendAction(params.get('login')));
    }));
  }

  sendRequest(id: number) {
    this.store.dispatch(new SendRequestAction(id));
  }

}
