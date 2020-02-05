import {Component, OnDestroy, OnInit} from '@angular/core';
import {HeroService} from '../../services/hero.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {DataService} from '../../services/data-service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];
  loginForm: FormGroup;
  regState: Observable<boolean> = this.dataService.registredState$ ;
  error: string;

  constructor(private heroService: HeroService,
              private dataService: DataService) { }

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
    this.heroService.login(this.loginForm.value);
  }


  submit() {
    if (this.loginForm.invalid) {
      console.log(this.loginForm);
    } else this.login();
  }
}
