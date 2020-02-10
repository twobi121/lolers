import {Component, Input, OnInit} from '@angular/core';
import {HeroService} from '../../services/hero.service';
import {Observable} from 'rxjs';
import {Hero} from '../../hero';

@Component({
  selector: 'app-last-photos',
  templateUrl: './last-photos.component.html',
  styleUrls: ['./last-photos.component.css']
})
export class LastPhotosComponent implements OnInit {
  @Input() hero: Hero;
  lastPhotos: Observable<[]>;
  url = 'http://localhost:8000/';
  constructor(private heroService: HeroService) { }

  ngOnInit() {
    console.log(this.hero)
    this.lastPhotos = this.heroService.getLastPhotos(this.hero._id);
  }

}
