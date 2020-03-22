import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../interfaces/user';
import {Friend} from '../../interfaces/friend';
import {constants} from '../../shared/constants/constants';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {
  @Input() user: User;
  @Input() loggedUser: User;
  @Input() friends: Friend[];
  @Output() getUserEmitter: EventEmitter<void> = new EventEmitter<void>();
  @Output() deleteFriendEmitter: EventEmitter<number> = new EventEmitter<number>();
  url = constants.url;

  constructor(
  ) { }

  ngOnInit() {
    if (!this.user) {
      this.getUserEmitter.emit();
    }
  }

  deleteFriend(id: number) {
    this.deleteFriendEmitter.emit(id);
  }

}
