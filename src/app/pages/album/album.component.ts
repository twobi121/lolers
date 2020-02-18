import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Hero} from '../../hero';
import {DataService} from '../../services/data-service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnChanges {
  @Input() hero: Hero;
  @Input() album: [];
  url = 'http://localhost:8000/';
  constructor(private dataService: DataService) { }

  ngOnChanges(): void {
    if (!this.album) {
      return;
    }

    // @ts-ignore
    this.dataService.photos = this.album[0].photos;
    this.dataService.albums = this.album;
  }

}
