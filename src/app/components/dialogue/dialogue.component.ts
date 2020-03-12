import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Message} from '../../interfaces/message';
import {User} from '../../interfaces/user';
import {Dialogue} from '../../interfaces/dialogue';
import {constants} from '../../shared/constants/constants';


@Component({
  selector: 'app-dialogue',
  templateUrl: './dialogue.component.html',
  styleUrls: ['./dialogue.component.css']
})
export class DialogueComponent {
  @Input() messages: Message[];
  @Input() loggedUser: User;
  @Input() activeDialogue: Dialogue;
  @Output() sendMessageEmitter: EventEmitter<Message> = new EventEmitter<Message>();
  url = constants.url;
  today: string = new Date().toJSON().split('T')[0];

  constructor() { }

  sendMessage(event: any) {
    const message = {
      message: event.target.value,
      owner_id: this.loggedUser._id,
      chat_id: this.activeDialogue._id,
      receivers_id: this.activeDialogue.users
    };
    event.target.value = '';
    this.sendMessageEmitter.emit(message);
  }
}
