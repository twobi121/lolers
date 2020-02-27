import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Params, Router} from '@angular/router';
import {DataService} from '../../services/data-service';
import {User} from '../../interfaces/user';
import {UserService} from '../../services/user.service';
import { Location } from '@angular/common';
import {Observable, Subscription} from 'rxjs';

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
 hero: User;
 photos: Photo[];
 selectedPhoto: Photo;
 url = 'http://localhost:8000/';
 albums: any[];
 subs: Subscription[] = [];
 deleteStatus = false;
 albumId: string;
 updateStatus = false;
 login$: Observable<string>;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private heroService: UserService,
  ) { }

  ngOnInit() {
    this.photos = this.dataService.photos;
    this.albums = this.dataService.albums;
    this.getHero();
    this.selectPhoto();
    this.login$ = this.dataService.login$;
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

  deletePhoto() {
    const deleteStatus = this.heroService.deletePhoto(this.selectedPhoto._id);
    this.subs.push(deleteStatus.subscribe(
      item => {
        if (item.status === 200) {
          this.deleteStatus = true;
          setTimeout(() => this.router.navigateByUrl(this.router.url.replace(this.selectedPhoto.filename,  '/')), 3000);
        }
      }
    ));
  }

  setPreview() {
    this.route.parent.paramMap.subscribe((params: ParamMap) => {
      this.albumId = params.get('id');
    });

    const updateStatus = this.heroService.setPreview(this.selectedPhoto.filename, this.albumId);
    this.subs.push(updateStatus.subscribe(item => {
      if (item.status === 200) {
        this.updateStatus = true;
        setTimeout(() => this.router.navigateByUrl(this.router.url.replace(this.selectedPhoto.filename,  '/')), 3000);
      }
    }));
  }

}
