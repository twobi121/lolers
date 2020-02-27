import {Component, Input} from '@angular/core';
import {User} from '../../interfaces/user';
import {Location} from '@angular/common';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})

export class UserEditComponent {
  @Input() hero: User;

  constructor( private location: Location
  ) {
  }

  goBack(): void {
    this.location.back();
  }

}
