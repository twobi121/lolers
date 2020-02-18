import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Params, Router} from '@angular/router';
import {DataService} from '../../services/data-service';
import {Hero} from '../../hero';
import {HeroService} from '../../services/hero.service';
import { Location } from '@angular/common';

interface Photo {
  filename: string;
  _id: string;
}

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {
 hero: Hero;
 photos: Photo[];
 selectedPhoto: Photo;
 url = 'http://localhost:8000/';
 albums: any[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private heroService: HeroService,
    private location: Location,
  ) { }

  ngOnInit() {
    this.photos = this.dataService.photos;
    this.albums = this.dataService.albums;
    this.getHero();
    this.selectPhoto();
  }

  getHero() {
    this.route.parent.paramMap.subscribe((params: ParamMap) => {
      this.heroService.getHero(params.get('login'))
        .subscribe(hero => this.hero = hero);
    });
  }

  selectPhoto() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.selectedPhoto = this.photos.find(item => item.filename === params.get('photo'));
    });

  }

  nextPhoto() {
    let idx = this.photos.findIndex(item => item === this.selectedPhoto );
    idx = (idx + 1 === this.photos.length) ? -1 : idx;
    this.router.navigateByUrl(this.router.url.replace(this.selectedPhoto.filename,  this.photos[idx + 1].filename));
  }

  prevPhoto() {
    let idx = this.photos.findIndex(item => item === this.selectedPhoto );
    idx = (idx === 0) ? this.photos.length : idx;
    this.router.navigateByUrl(this.router.url.replace(this.selectedPhoto.filename,  this.photos[idx - 1].filename));
  }



  closePhoto(event: any ) {
    const target = event.target.className;
    if (target === 'fas fa-times close_btn' || target === 'upload_modal_overlay' ) {
      this.router.navigateByUrl(this.router.url.replace(this.selectedPhoto.filename,  '/'));
    }
    event.stopPropagation();
  }
}
