import {Component, OnInit, Input, OnDestroy, Output, EventEmitter} from '@angular/core';
import {Hero} from '../hero';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {HeroService} from '../services/hero.service';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})

export class HeroDetailComponent implements OnDestroy {
  @Input() hero: Hero;

  @Output() onSave: EventEmitter<any> = new EventEmitter<any>();

  constructor(private route: ActivatedRoute,
              private heroService: HeroService,
              private location: Location
  ) {
  }

  save():void {
    const data = 1;
    this.onSave.emit(data);
  }

  goBack(): void {
    this.location.back();
  }

  ngOnDestroy() {

  }

}
