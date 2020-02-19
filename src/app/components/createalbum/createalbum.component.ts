import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {DataService} from '../../services/data-service';
import {HeroService} from '../../services/hero.service';
import {NgForm} from '@angular/forms';
import {HttpResponse} from '@angular/common/http';
import {Observable, Subscription} from 'rxjs';
import {Hero} from '../../hero';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-createalbum',
  templateUrl: './createalbum.component.html',
  styleUrls: ['./createalbum.component.css']
})

export class CreatealbumComponent implements OnInit, OnDestroy {
  private loading: Observable<HttpResponse<object>>;
  created = false;
  subs: Subscription[] = [];
  hero: Hero;
  album: object;
  selectedFiles: [];
  blobs: SafeUrl[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private heroService: HeroService,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    this.getHero();
  }

  ngOnDestroy(): void {
    this.subs.forEach(item => item.unsubscribe());
  }

  getHero() {
    this.route.parent.paramMap.subscribe((params: ParamMap) => {
      this.heroService.getHero(params.get('login'))
        .subscribe(hero => this.hero = hero);
    });
  }

  close($event: any) {
    const target = $event.target.className;
    if (target === 'fas fa-times close_btn' || target === 'upload_modal_overlay' ) {
      this.router.navigateByUrl(this.router.url.replace('create',  '/'));
    }
    $event.stopPropagation();
  }

  create(myForm: NgForm) {
    this.loading = this.heroService.createAlbum(myForm.form.value);
    this.subs.push(
      this.loading.subscribe(
      item => {
          if (item.status === 200) {
            this.album = item.body;
            this.created = true;
            myForm.form.reset();
          }
        }
      )
    );
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
      this.router.navigateByUrl(`hero/${this.hero.login}/album/${this.album}/upload`);
    }
  }

}
