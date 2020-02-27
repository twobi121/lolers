import {Component, OnDestroy, OnInit} from '@angular/core';
import {SafeUrl} from '@angular/platform-browser';
import {DataService} from '../../services/data-service';
import {UserService} from '../../services/user.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {HttpResponse} from '@angular/common/http';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit, OnDestroy {

  selectedFiles: [];
  blobs: SafeUrl[];
  albums$: Observable<[]>;
  albums: [];
  subs: Subscription[] = [];
  selectedValue: '';
  url = 'http://localhost:8000/';
  loading: SafeUrl[] = [];
  constructor(
    private dataService: DataService,
    private heroService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.selectedFiles = this.dataService.selectedFiles;
    this.blobs = this.dataService.blobs;
    // @ts-ignore
    if (this.route.params.value.id) {
      this.getAlbums();
      // @ts-ignore
    } else if (this.route.params.value.album_id) {
      // @ts-ignore
      this.selectedValue = this.route.params.value.album_id;
    }
  }

  ngOnDestroy(): void {
    this.subs.forEach(item => item.unsubscribe());
  }


  getAlbums(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.albums$ = this.heroService.getAlbums(params.get('id'));
    });

    this.subs.push(this.albums$.subscribe(item => {
      this.albums = item;
      // @ts-ignore
      this.selectedValue = this.albums[0]._id;
    }));

  }

  upload() {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.selectedFiles.length; i++) {
      const loading = this.heroService.uploadPhoto(this.selectedFiles[i], this.selectedValue);
      this.subs.push(loading.subscribe(event => {
        // @ts-ignore
        if (event instanceof HttpResponse && event.body === 'Файл загружен') {
          this.loading.push(this.blobs[i]);
        }
      }));
    }

  }

}
