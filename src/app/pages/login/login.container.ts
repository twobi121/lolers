import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {State} from '../../store/states/app.state';
import {LoginAction} from '../../store/users/actions';
import {Observable} from 'rxjs';
import {selectLoginError} from '../../store/users/selectors';

@Component({
  selector: 'app-login-container',
  template: '<app-login [loginForm]="loginForm" [loginError]="loginError$ | async" (submitEmitter)="submit()"></app-login>',
  styleUrls: ['./login.component.scss']
})

export class LoginContainer implements OnInit {
  loginError$: Observable<string> = this.store.select(selectLoginError);
  loginForm: FormGroup;
  validationError: boolean;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<State>) { }

  ngOnInit() {
    this.createGroupForm();
  }

  createGroupForm() {
    this.loginForm = new FormGroup({
      login: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    });
  }

  submit() {
    if (this.loginForm.invalid) {
      this.validationError = true;
    } else { this.login(); }
  }

  login() {
    this.store.dispatch(new LoginAction(this.loginForm.value));
  }
}
