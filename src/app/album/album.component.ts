import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {HeroService} from '../services/hero.service';
import {Observable} from 'rxjs';
import {Hero} from '../hero';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  album$: Observable<any>;
  url = 'http://localhost:8000/';

  constructor(private route: ActivatedRoute,
              private heroService: HeroService) { }

  ngOnInit(): void {
    this.getAlbum();
  }

  getAlbum(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.album$ = this.heroService.getAlbum(params.get('id'));
    });
  }



}
