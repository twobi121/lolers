import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from '../../interfaces/user';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent {
  @Input() loggedUser: User;
  @Input() isAuth: boolean;
  @Input() selectUnreadMessagesNumber: number;
  @Output() logoutEmitter: EventEmitter<void> = new EventEmitter();

  logout() {
    this.logoutEmitter.emit();
  }

}
