import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from '../../interfaces/user';
import {IsFriend} from '../../interfaces/isFriend';
import {Dialogue} from '../../interfaces/dialogue';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent {
  @Input() login: string;
  @Input() isAuth: boolean;
  @Input() user: User;
  @Input() loggedUser: User;
  @Input() isFriend: IsFriend;
  @Input() requestStatus: boolean;
  @Input() dialogueId: Dialogue;
  @Input() requestNumber: number;
  @Output() requestEvent: EventEmitter<number> = new EventEmitter<number>();

  sendRequest(id: number) {
    this.requestEvent.emit(id);
  }

}


