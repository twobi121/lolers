import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Message} from '../../interfaces/message';
import {User} from '../../interfaces/user';
import {Dialogue} from '../../interfaces/dialogue';
import {constants} from '../../shared/constants/constants';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-dialogue',
  templateUrl: './dialogue.component.html',
  styleUrls: ['./dialogue.component.css']
})
export class DialogueComponent implements OnInit {
  @Input() messages: Message[];
  @Input() loggedUser: User;
  @Input() activeDialogue: Dialogue;
  @Input() dialogueMembers: User[];
  @Output() sendMessageEmitter: EventEmitter<Message> = new EventEmitter<Message>();
  @Output() setConnectionEmitter: EventEmitter<number> = new EventEmitter<number>();
  url = constants.url;
  today: string = new Date().toJSON().split('T')[0];

  constructor() { }

  ngOnInit() {
    this.setConnectionEmitter.emit(this.activeDialogue._id);
  }

  sendMessage(event: any) {
    const message = {
      message: event.target.value,
      owner_id: this.loggedUser._id,
      chat_id: this.activeDialogue._id
    };
    event.target.value = '';
    this.sendMessageEmitter.emit(message);
  }
}
