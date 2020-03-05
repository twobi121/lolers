import {Component} from '@angular/core';
import {User} from '../../interfaces/user';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {State} from '../../store/states/app.state';
import {selectRegState} from '../../store/users/selectors';
import {AddUserAction} from '../../store/users/actions';

@Component({
  selector: 'app-registration-container',
  template: '<app-registration (addUserEmitter)="addUser($event)" [regState]="regState$ | async"></app-registration>',
  styleUrls: ['./registration.component.css']
})

export class RegistrationContainer {
  regState$: Observable<boolean> = this.store.select(selectRegState);

  constructor(private store: Store<State>
  ) { }

  addUser(user: User): void {
    this.store.dispatch(new AddUserAction(user));
  }
}
