import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import { HeroService } from '../../services/hero.service';
import {Hero} from '../../hero';
import {Observable, Subscription} from 'rxjs';
import {DataService} from '../../services/data-service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];
  registrationState: Observable<boolean>;

  constructor(private heroService: HeroService,
              private dataService: DataService
              ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  addHero(myForm: NgForm): void {
    const hero: Hero = myForm.form.value;
    this.registrationState = this.heroService.addHero(hero);
    this.subs.push(this.registrationState
      .subscribe(state => this.dataService.changeRegState(state))
    );
  }
}
