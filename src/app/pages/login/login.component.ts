import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {DataService} from '../../services/data-service';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {State} from '../../store/states/app.state';
import {GetLoggedUserAction} from '../../store/users/actions';

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];
  loginForm: FormGroup;
  error: string;

  constructor(private heroService: UserService,
              private dataService: DataService,
              private route: ActivatedRoute,
              private router: Router,
              private store: Store<State>) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      login: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    });

    this.subs.push(this.dataService.authErr$.subscribe(error => {
      this.error = error;
    }));
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  login() {
    const data$ = this.heroService.login(this.loginForm.value);
    this.subs.push(data$.subscribe((data: Data) => {
        if (data.token) {
          localStorage.setItem('authUserToken', data.token);
          this.store.dispatch(new GetLoggedUserAction());
          this.router.navigateByUrl(`user/${data.user.login}`);
        }
    }));
  }

  submit() {
    if (this.loginForm.invalid) {
      console.log(this.loginForm);
    } else this.login();
  }
}
