import {Component, Input} from '@angular/core';
import { User } from '../../interfaces/user';
import {constants} from '../../shared/constants/constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})

export class DashboardComponent {
  @Input() users: User[];
  url = constants.url;
}
