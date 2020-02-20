import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {Hero} from '../../hero';
import {DataService} from '../../services/data-service';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {HeroService} from '../../services/hero.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnChanges, OnDestroy {
  @Input() hero: Hero;
  @Input() album: [];
  @Input() login: string;
  selectedFiles: [];
  blobs: SafeUrl[] = [];
  url = 'http://localhost:8000/';
  subs: Subscription[] = [];
  deleteStatus = false;

  constructor(private dataService: DataService,
              private heroService: HeroService,
              private sanitizer: DomSanitizer,
              private router: Router) { }

  ngOnChanges(): void {
    if (!this.album) {
      return;
    }

    // @ts-ignore
    this.dataService.photos = this.album[0].photos;
    this.dataService.albums = this.album;
  }

  ngOnDestroy(): void {
    this.subs.forEach(item => item.unsubscribe());
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
      this.router.navigateByUrl(`hero/${this.hero.login}/album/${this.album[0]._id}/upload`);
    }
  }

  delete() {
    // @ts-ignore
    const success = this.heroService.deleteAlbum(this.album[0]._id);
    this.subs.push(success.subscribe(
      item => {
        if (item.status === 200) {
          this.deleteStatus = true;
          setTimeout(() => this.router.navigateByUrl(`hero/${this.hero.login}/albums/${this.hero._id}`), 3000);
        }
      }
    ));
  }
}
