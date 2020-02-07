import {Component, Input} from '@angular/core';
import {Hero} from '../../hero';
import {HeroService} from '../../services/hero.service';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {HttpHeaderResponse} from '@angular/common/http';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent {


  @Input() hero: Hero;

  constructor() { }


}
