import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from '../../interfaces/user';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent {
  @Input() loggedUser: User;
  @Input() isAuth: boolean;
  @Output() logoutEmitter: EventEmitter<void> = new EventEmitter();
  @Output() setConnectionEmitter: EventEmitter<number> = new EventEmitter<number>();

  logout() {
    this.logoutEmitter.emit();
  }

}
