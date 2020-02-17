import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {HeroService} from '../../services/hero.service';
import {Observable} from 'rxjs';
import {Hero} from '../../hero';
import {DataService} from '../../services/data-service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnChanges {
  @Input() albumsPhotos: any;
  @Input() hero: Hero;
  albums: [];
  photosByYear = [];
  photos = [];
  url = 'http://localhost:8000/';

  constructor(private route: ActivatedRoute,
              private heroService: HeroService,
              private dataService: DataService) { }


  ngOnChanges(): void {
    if (!this.albumsPhotos) {
      return;
    }

    this.albums = this.albumsPhotos.albums;
    this.photosByYear = this.albumsPhotos.photos;
    this.photosByYear.forEach(item => this.photos = this.photos.concat(item.filenames));
    this.dataService.photos = this.photos;
  }

  selectPhoto(photo: string) {
    this.dataService.photos = this.photos;
  }
}
