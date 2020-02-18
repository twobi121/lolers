import {Component, Input, OnInit} from '@angular/core';
import {HeroService} from '../../services/hero.service';
import {Observable} from 'rxjs';
import {Hero} from '../../hero';
import {DataService} from '../../services/data-service';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {HttpHeaderResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-last-photos',
  templateUrl: './last-photos.component.html',
  styleUrls: ['./last-photos.component.css']
})
export class LastPhotosComponent {
  @Input() hero: Hero;
  @Input() lastPhotos: {};
  @Input() login: string;
  selectedFiles: [];
  blobs: SafeUrl[] = [];
  url = 'http://localhost:8000/';

  constructor(private heroService: HeroService,
              private dataService: DataService,
              private sanitizer: DomSanitizer,
              private router: Router,
              private route: ActivatedRoute) { }



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
      this.router.navigateByUrl(this.route.snapshot._routerState.url + `/albums/${this.hero._id}/upload`);
    }
  }

  unselectFile(fileInput: HTMLInputElement, event: Event) {
   // @ts-ignore
    if (event.target.className === 'upload_modal_overlay' || event.target.innerText === 'Отмена' ) {
     this.selectedFiles = null;
     this.blobs = [];
     fileInput.value = '';
   }

  }

  upload() {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.heroService.uploadPhoto(this.selectedFiles[i]);
    }

    this.selectedFiles = null;
  }


}
