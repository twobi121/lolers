import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import { HeroService } from '../services/hero.service';
import {Hero} from '../hero';


@Component({
  selector: 'app-hero-add',
  templateUrl: './hero-registration.component.html',
  styleUrls: ['./hero-registration.component.css']
})

export class HeroRegistrationComponent implements OnInit {
  @ViewChild('inputName', {static: false}) inputName: ElementRef
  addFlag: boolean;

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.addFlag = false;
  }

  addHero(myForm: NgForm): void {
    const hero: Hero = myForm.form.value;
    this.heroService.addHero(hero);
  }
}
