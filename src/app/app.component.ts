import {Component, OnInit} from '@angular/core';
import {State} from './store/states/app.state';
import {Store} from '@ngrx/store';
import {GetLoggedUserAction} from './store/users/actions';
import {SetConnectionAction, SubscribeNotificationsAction} from './store/socket/actions';
import {selectLoggedUser} from './store/users/selectors';
import {selectIsConnected} from './store/socket/selectors';
import {selectNotifications} from './store/notifications/selectors';
import {Message} from './interfaces/message';
import {Observable} from 'rxjs';
import {User} from './interfaces/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  loggedUser$: Observable<User> = this.store.select(selectLoggedUser);
  isConnected$: Observable<boolean> = this.store.select(selectIsConnected);
  notification$: Observable<Message> = this.store.select(selectNotifications);
  newMessage: Message;
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
      this.notification$.subscribe(message => {
        if (message) {
          this.newMessage = message;
          console.log(this.newMessage);
          setTimeout(() => this.newMessage = null, 4000);
        }
      })
    }
  }
}
