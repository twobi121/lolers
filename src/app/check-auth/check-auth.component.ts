import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HeroService} from '../services/hero.service';

@Component({
  selector: 'app-check-auth',
  templateUrl: './check-auth.component.html',
  styleUrls: ['./check-auth.component.css']
})
export class CheckAuthComponent implements OnInit {

  constructor(private router: Router,
              private heroService: HeroService) { }

  ngOnInit() {
    if (localStorage.getItem('heroToken')) {
        this.heroService.getUserLogin();
    } else this.router.navigateByUrl(`login`);
  }
}
