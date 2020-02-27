import {Component, OnInit} from '@angular/core';
import {State} from './store/states/app.state';
import {Store} from '@ngrx/store';
import {GetLoggedUserAction} from './store/users/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  constructor(private store: Store<State> ) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('authUserToken')) {
      this.store.dispatch(new GetLoggedUserAction());
    }
  }
}
