import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Message} from '../../interfaces/message';
import {User} from '../../interfaces/user';
import {Dialogue} from '../../interfaces/dialogue';
import {constants} from '../../shared/constants/constants';


@Component({
  selector: 'app-dialogue',
  templateUrl: './dialogue.component.html',
  styleUrls: ['./dialogue.component.css']
})
export class DialogueComponent implements OnChanges {
  @Input() messages: Message[];
  @Input() loggedUser: User;
  @Input() activeDialogue: Dialogue;
  @Input() isConnected: boolean;
  @Output() initComponentEmitter: EventEmitter<number> = new EventEmitter<number>();
  @Output() sendMessageEmitter: EventEmitter<Message> = new EventEmitter<Message>();
  @Output() setMessagesAsReadEmitter: EventEmitter<number> = new EventEmitter<number>();
  @Output() getPreviousMessagesEmitter: EventEmitter<number> = new EventEmitter<number>();
  url = constants.url;
  today: string = new Date().toJSON().split('T')[0];

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (this.isConnected && changes.activeDialogue && changes.activeDialogue.currentValue) {
      if (this.activeDialogue.lastMessage.owner_id !== this.loggedUser._id) {
        this.initComponentEmitter.emit(this.activeDialogue.lastMessage.owner_id);
      } else this.initComponentEmitter.emit(0);
    }
    const chg = changes.messages;
    if (chg && chg.currentValue.length && chg.previousValue.length && chg.currentValue.length !== chg.previousValue.length && !chg.firstChange && chg.currentValue[chg.currentValue.length - 1].owner_id !== this.loggedUser._id ) {
      setTimeout(() => this.setMessagesAsReadEmitter.emit(this.activeDialogue._id), 2000);
    }
  }

  sendMessage(event: any) {
    const message = {
      message: event.target.value,
      owner_id: this.loggedUser._id,
      chat_id: this.activeDialogue._id,
      receivers_id: this.activeDialogue.users.map(user => user._id)
    };
    event.target.value = '';
    this.sendMessageEmitter.emit(message);
  }

  scroll(event: any) {
    if (!event.target.scrollTop) {
      this.getPreviousMessagesEmitter.emit(this.messages.length);
    }
  }
}
