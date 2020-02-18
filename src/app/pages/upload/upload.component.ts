import { Component, OnInit } from '@angular/core';
import {SafeUrl} from '@angular/platform-browser';
import {DataService} from '../../services/data-service';
import {HeroService} from '../../services/hero.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  selectedFiles: [];
  blobs: SafeUrl[];
  albums$: Observable<[]>;
  url = 'http://localhost:8000/';
  constructor(
    private dataService: DataService,
    private heroService: HeroService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.selectedFiles = this.dataService.selectedFiles;
    this.blobs = this.dataService.blobs;
    this.getAlbums();
  }

  getAlbums(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.albums$ = this.heroService.getAlbums(params.get('id'));
    });
  }

  upload() {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.heroService.uploadPhoto(this.selectedFiles[i]);
    }

    this.selectedFiles = null;
  }

}
