import {Component, OnInit} from '@angular/core';
import {State} from './store/states/app.state';
import {Store} from '@ngrx/store';
import {GetLoggedUserAction} from './store/users/actions';
import {SetConnectionAction, SubscribeNotificationsAction} from './store/socket/actions';
import {Observable, Subscription} from 'rxjs';
import {User} from './interfaces/user';
import {selectLoggedUser} from './store/users/selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  loggedUser$: Observable<User> = this.store.select(selectLoggedUser);
  constructor(private store: Store<State>,
              ) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('authUserToken')) {
      this.store.dispatch(new GetLoggedUserAction());
      this.store.dispatch(new SetConnectionAction());
    }
  }
}
