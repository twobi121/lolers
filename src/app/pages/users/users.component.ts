import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from '../../interfaces/user';
import {constants} from '../../shared/constants/constants';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  @Input() users: User[];
  @Output() searchEmitter: EventEmitter<string> = new EventEmitter<string>();
  @Output() getUsersEmitter: EventEmitter<void> = new EventEmitter<void>();
  url = constants.url;

  search(event: Event) {
    // @ts-ignore
    const value = event.target.value;
    if (value.length && value.length % 3 === 0) {
      this.searchEmitter.emit(value);
    } else if (!value.length) {
      this.getUsersEmitter.emit();
    }
  }
}
