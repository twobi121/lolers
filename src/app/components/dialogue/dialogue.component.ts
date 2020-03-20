import {
  AfterViewChecked,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {Message} from '../../interfaces/message';
import {User} from '../../interfaces/user';
import {Dialogue} from '../../interfaces/dialogue';
import {constants} from '../../shared/constants/constants';


@Component({
  selector: 'app-dialogue',
  templateUrl: './dialogue.component.html',
  styleUrls: ['./dialogue.component.css']
})
export class DialogueComponent implements OnChanges, AfterViewChecked  {
  @Input() messages: Message[];
  @Input() loggedUser: User;
  @Input() activeDialogue: Dialogue;
  @Input() isConnected: boolean;
  @Output() initComponentEmitter: EventEmitter<number> = new EventEmitter<number>();
  @Output() sendMessageEmitter: EventEmitter<Message> = new EventEmitter<Message>();
  @Output() setMessagesAsReadEmitter: EventEmitter<number> = new EventEmitter<number>();
  @Output() getPreviousMessagesEmitter: EventEmitter<number> = new EventEmitter<number>();
  @ViewChild('scrollMe', {static: false}) scrollElem: ElementRef;
  disableScrollDown = false;
  url = constants.url;
  today: string = new Date().toJSON().split('T')[0];
  firstMessageId: number;
  constructor() { }


  ngOnChanges(changes: SimpleChanges) {

    if (changes.activeDialogue) {
        if (this.activeDialogue.lastMessage && this.activeDialogue.lastMessage.owner_id !== this.loggedUser._id) {
          this.initComponentEmitter.emit(this.activeDialogue.lastMessage.owner_id);
        } else this.initComponentEmitter.emit(0);
    }

    if (changes.messages) {
      const crt = changes.messages.currentValue;
      const prv = changes.messages.previousValue;

      if (prv && prv.length && crt.length && crt[crt.length - 1]._id !== prv[prv.length - 1]._id && this.scrollElem) {
        this.disableScrollDown = false;
        this.scrollToBottom();
      } else if ( crt && prv && crt.length && prv.length && prv[prv.length - 1]._id === crt[crt.length - 1]._id && this.scrollElem && prv.length !== crt.length) {
        setTimeout(() => {
          this.disableScrollDown = true;
          this.firstMessageId = prv[0]._id;
          const doc = document.getElementById(`${this.firstMessageId}`);
          doc.scrollIntoView({block: 'center'});
        }, 0);
      }
    }
  }

  ngAfterViewChecked() {
    if (this.scrollElem) {
      this.scrollToBottom();
    }
  }

  sendMessage(event: any) {
    if (!event.target.value) {
      return;
    }
    const message = {
      message: event.target.value,
      owner_id: this.loggedUser._id,
      chat_id: this.activeDialogue._id,
      receivers_id: this.activeDialogue.users.map(user => user._id)
    };
    event.target.value = '';
    this.sendMessageEmitter.emit(message);
  }

  scrollToBottom() {
    if (this.disableScrollDown) {
      return;
    }
    this.scrollElem.nativeElement.scrollTop = this.scrollElem.nativeElement.scrollHeight;
  }

  onScroll(event: any) {
    const element = this.scrollElem.nativeElement;
    const atBottom = element.scrollHeight - element.scrollTop === element.clientHeight;
    this.disableScrollDown = !(this.disableScrollDown && atBottom);
    if (!event.target.scrollTop) {
      this.getPreviousMessagesEmitter.emit(this.messages.length);
    }
  }

}
