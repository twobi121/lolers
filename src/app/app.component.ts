import {Component, OnInit} from '@angular/core';
import {State} from './store/states/app.state';
import {Store} from '@ngrx/store';
import {GetLoggedUserAction, SetRequestNumberAction} from './store/users/actions';
import {SetConnectionAction, SubscribeNotificationsAction} from './store/socket/actions';
import {selectLoggedUser} from './store/users/selectors';
import {selectIsConnected} from './store/socket/selectors';
import {selectFriendshipNotification, selectLikeNotification, selectMessagesNotification} from './store/notifications/selectors';
import {Message} from './interfaces/message';
import {Observable} from 'rxjs';
import {User} from './interfaces/user';
import {constants} from './shared/constants/constants';
import {Router} from '@angular/router';
import {SetUnreadMessagesNumberAction} from './store/dialogues/actions';
import {Like} from './interfaces/like';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  loggedUser$: Observable<User> = this.store.select(selectLoggedUser);
  isConnected$: Observable<boolean> = this.store.select(selectIsConnected);
  messagesNotification$: Observable<Message> = this.store.select(selectMessagesNotification);
  friendshipNotification$: Observable<User> = this.store.select(selectFriendshipNotification);
  likeNotification$: Observable<Like> = this.store.select(selectLikeNotification);
  newMessage: Message;
  friendship: User;
  loggedUser: User;
  like: Like;
  url = constants.url;
  constructor(private store: Store<State>,
              private router: Router
              ) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('authUserToken')) {
      this.store.dispatch(new GetLoggedUserAction());
    }

    this.loggedUser$.subscribe(user => {
      if (user) {
        this.loggedUser = user;
        this.store.dispatch(new SetConnectionAction(user._id));
      }
    });
    this.isConnected$.subscribe(state => {
      if (state) {
        this.store.dispatch(new SubscribeNotificationsAction());
        this.store.dispatch(new SetUnreadMessagesNumberAction());
      }
    });
    this.messagesNotification$.subscribe(message => {
      if (message) {
        this.newMessage = message;
        this.store.dispatch(new SetUnreadMessagesNumberAction());
        setTimeout(() => this.newMessage = null, 4000);
      }
    });
    this.friendshipNotification$.subscribe(friendship => {
      if (friendship) {
        this.friendship = friendship;
        this.store.dispatch(new SetRequestNumberAction());
        setTimeout(() => this.friendship = null, 4000);
      }
    });
    this.likeNotification$.subscribe(like => {
      if (like) {
        this.like = like;
        setTimeout(() => this.like = null, 4000);
      }
    });
  }

  navigateTo() {
    this.router.navigateByUrl(`/user/${this.loggedUser.login}/dialogues/${this.newMessage.chat_id}`);
  }
}
