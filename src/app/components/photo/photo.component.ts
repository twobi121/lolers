import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {DataService} from '../../services/data-service';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {
 photos: any[];
 selectedPhoto: {};
 url = 'http://localhost:8000/';

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.photos = this.dataService.photos;
    this.selectPhoto();
  }

  selectPhoto() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.selectedPhoto = this.photos.find(item => item.filename === params.get('photo'));
    });
  }

  nextPhoto() {
    let idx = this.photos.findIndex(item => item === this.selectedPhoto );
    idx = (idx + 1 === this.photos.length) ? -1 : idx;
    this.selectedPhoto = this.photos[idx + 1];
  }

  prevPhoto() {
    let idx = this.photos.findIndex(item => item === this.selectedPhoto );
    idx = (idx === 0) ? this.photos.length : idx;
    this.selectedPhoto = this.photos[idx - 1];
  }
}
