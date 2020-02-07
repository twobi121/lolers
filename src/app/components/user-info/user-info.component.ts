import {Component, Input} from '@angular/core';
import {Hero} from '../../hero';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent {
  @Input() hero: Hero;

  constructor() { }

}
