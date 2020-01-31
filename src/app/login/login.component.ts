import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HeroService} from '../services/hero.service';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {Hero} from '../hero';



@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      login: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    });
  }

  login() {
    console.log(this.loginForm.value)
    this.heroService.login(this.loginForm.value);
  }


  submit() {
    if (this.loginForm.invalid) {
      console.log(this.loginForm);
    } else this.login();
  }
}
