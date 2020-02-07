import {Component, Input, OnInit} from '@angular/core';
import {HttpHeaderResponse} from '@angular/common/http';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {HeroService} from '../../services/hero.service';
import {Hero} from '../../hero';
import {DataService} from '../../services/data-service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})

export class AvatarComponent implements OnInit {
  @Input() hero: Hero;
  login$: Observable<string>;
  avatar: SafeUrl;
  preview: SafeUrl;
  selectedFile: object;
  url = 'http://localhost:8000/';

  constructor(private heroService: HeroService,
              private sanitizer: DomSanitizer,
              private dataService: DataService) { }

  ngOnInit(): void {
    this.login$ = this.dataService.login$;
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile ) {
      this.preview = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.selectedFile));
    }
  }

  unselectFile(fileInput: HTMLInputElement) {
    this.selectedFile = null;
    fileInput.value = '';
  }

  upload(fileInput: HTMLInputElement) {
    const loading = this.heroService.uploadAvatar(this.selectedFile);
    loading.subscribe(event => {
      if (event instanceof HttpHeaderResponse && event.ok) {
        this.avatar = this.preview;
      }
    });
  }

}
