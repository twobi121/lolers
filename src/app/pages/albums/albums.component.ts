import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {HeroService} from '../../services/hero.service';
import {Observable} from 'rxjs';
import {Hero} from '../../hero';
import {DataService} from '../../services/data-service';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

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
  selectedFiles: [];
  blobs: SafeUrl[] = [];
  url = 'http://localhost:8000/';

  constructor(private route: ActivatedRoute,
              private heroService: HeroService,
              private dataService: DataService,
              private sanitizer: DomSanitizer,
              private router: Router) { }


  ngOnChanges(): void {
    if (!this.albumsPhotos) {
      return;
    }

    this.albums = this.albumsPhotos.albums;
    this.photosByYear = this.albumsPhotos.photos;
    this.photosByYear.forEach(item => this.photos = this.photos.concat(item.filenames));
    this.dataService.photos = this.photos;
    this.dataService.albums = this.albums;
  }

  selectPhoto(photo: string) {
    this.dataService.photos = this.photos;
  }

  onFileChanged($event: Event) {
    // @ts-ignore
    this.selectedFiles = $event.target.files;
    if (this.selectedFiles.length ) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.blobs.push(this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.selectedFiles[i])));
      }
      this.dataService.blobs = this.blobs;
      this.dataService.selectedFiles = this.selectedFiles;
      // @ts-ignore
      this.router.navigateByUrl(`hero/${this.hero.login}/albums/${this.hero._id}/upload`);
    }
  }
}
