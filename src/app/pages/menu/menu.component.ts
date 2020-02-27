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
  @Output() logoutEmitter = new EventEmitter();

  logout() {
    this.logoutEmitter.emit();
  }

}
