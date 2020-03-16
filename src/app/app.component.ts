import {Component, OnInit} from '@angular/core';
import {State} from './store/states/app.state';
import {Store} from '@ngrx/store';
import {GetLoggedUserAction} from './store/users/actions';
import {SetConnectionAction, SubscribeNotificationsAction} from './store/socket/actions';
import {selectLoggedUser} from './store/users/selectors';
import {selectIsConnected} from './store/socket/selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  loggedUser$ = this.store.select(selectLoggedUser);
  isConnected$ = this.store.select(selectIsConnected);
  constructor(private store: Store<State>,
              ) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('authUserToken')) {
      this.store.dispatch(new GetLoggedUserAction());
      this.loggedUser$.subscribe(user => {
        if (user) {
          this.store.dispatch(new SetConnectionAction(user._id));
        }
      });
      this.isConnected$.subscribe(state => {
        if (state) {
          this.store.dispatch(new SubscribeNotificationsAction());
        }
      });
    }
  }
}
