import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {User} from '../../interfaces/user';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnChanges{
  @Input() loggedUser: User;
  @Input() isAuth: boolean;
  @Output() logoutEmitter: EventEmitter<void> = new EventEmitter();
  @Output() setConnectionEmitter: EventEmitter<number> = new EventEmitter<number>();
  logout() {
    this.logoutEmitter.emit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.loggedUser && changes.loggedUser.currentValue) {
      this.setConnectionEmitter.emit(this.loggedUser._id);
    }
  }

}
