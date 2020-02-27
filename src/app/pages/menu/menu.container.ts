import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {State} from '../../store/states/app.state';
import {User} from '../../interfaces/user';
import {selectIsAuth, selectLoggedUser} from '../../store/users/selectors';
import {LogoutAction} from '../../store/users/actions';

@Component({
  selector: 'app-menu-container',
  template: '<app-menu [loggedUser]="loggedUser$ | async" [isAuth]="isAuth$ | async" (logoutEmitter)="logout()"></app-menu>',
  styleUrls: ['./menu.component.css']
})
export class MenuContainer {

  isAuth$: Observable<boolean> = this.store.pipe(select(selectIsAuth));
  loggedUser$: Observable<User> = this.store.pipe(select(selectLoggedUser));

  constructor(private store: Store<State>,
              ) {}

  logout() {
    this.store.dispatch(new LogoutAction());
  }

}
