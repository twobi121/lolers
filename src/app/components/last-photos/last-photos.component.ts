import { Component, OnInit } from '@angular/core';
import {HeroService} from '../../services/hero.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-last-photos',
  templateUrl: './last-photos.component.html',
  styleUrls: ['./last-photos.component.css']
})
export class LastPhotosComponent implements OnInit {
  lastPhotos: Observable<[]>;
  url = 'http://localhost:8000/';
  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.lastPhotos = this.heroService.getLastPhotos();
  }

}
