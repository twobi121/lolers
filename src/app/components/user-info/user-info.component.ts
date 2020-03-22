import {Component, Input} from '@angular/core';
import {User} from '../../interfaces/user';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})

export class UserInfoComponent {
  @Input() user: User;
}
