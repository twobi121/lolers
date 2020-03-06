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
  @Output() setSortEmitter: EventEmitter<string> = new EventEmitter<string>();
  @Output() getUsersEmitter: EventEmitter<string> = new EventEmitter<string>();
  @Output() setListNumberEmitter: EventEmitter<number> = new EventEmitter<number>();
  url = constants.url;
  timer: number;
  listNumber = 5;

  search(event: Event) {
    // @ts-ignore
    const value = event.target.value;
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.getUsersEmitter.emit(value), 1000);
  }

  setListNumber(value: string) {
    this.listNumber = +value;
    this.setListNumberEmitter.emit(+value);
  }

  setSort(value: string) {
    this.setSortEmitter.emit(value);
  }
}
