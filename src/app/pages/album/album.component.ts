import {Component, Input, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../interfaces/user';
import {DataService} from '../../services/data-service';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnChanges, OnDestroy {
  @Input() hero: User;
  @Input() album: [];
  @Input() login: string;
  selectedFiles: [];
  blobs: SafeUrl[] = [];
  url = 'http://localhost:8000/';
  subs: Subscription[] = [];
  deleteStatus = false;
  name: string;
  status = false;
  status1 = false;
  constructor(private dataService: DataService,
              private heroService: UserService,
              private sanitizer: DomSanitizer,
              private router: Router) { }

  ngOnChanges(): void {
    if (!this.album) {
      return;
    }

    // @ts-ignore
    this.dataService.photos = this.album[0].photos;
    this.dataService.albums = this.album;
    // @ts-ignore
    this.name = this.album[0].name;
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

  showInput($event: Event) {
    // @ts-ignore
    if ($event.target.id === '1') {
      this.status = true;
    } else this.status1 = true;
// @ts-ignore


  }

  updateAlbum(element: HTMLInputElement) {
    if (element.name === 'name') {
      // @ts-ignore
      this.heroService.updateAlbum({id: this.album[0]._id, name: element.value});
      this.status = false;
    } else {
      // @ts-ignore
      this.heroService.updateAlbum({id: this.album[0]._id, description: element.value});
      this.status1 = false;
    }
  }
}
