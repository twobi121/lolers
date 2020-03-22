import {Component, OnInit} from '@angular/core';
import {User} from '../../interfaces/user';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../services/user.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-user-edit-container',
  template: '<app-user-edit [hero] = "hero$ | async"></app-user-edit>',
  styleUrls: ['./user-edit.component.scss']
})

export class UserEditContainer implements OnInit {
  hero$: Observable<User>;

  constructor(private route: ActivatedRoute,
              private heroService: UserService,
  ) {
  }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const login = this.route.snapshot.paramMap.get('login');
    this.hero$ = this.heroService.getHero(login);
  }

}
