import {Component, Input} from '@angular/core';
import {Hero} from '../../hero';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent {

  @Input() hero: Hero;
  avatar: string = 'http://localhost:8000/avatar.jpg';

  constructor() { }

}
