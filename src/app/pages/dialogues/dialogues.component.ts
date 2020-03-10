import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import * as io from 'socket.io-client';
import {constants} from '../../shared/constants/constants';
import {Observable, Subject} from 'rxjs';
import {ChatService} from '../../services/chat.service';
import {Dialogue} from '../../interfaces/dialogue';
import {User} from '../../interfaces/user';
import {Message} from '../../interfaces/message';

@Component({
  selector: 'app-dialogues',
  templateUrl: './dialogues.component.html',
  styleUrls: ['./dialogues.component.css']
})
export class DialoguesComponent {
  @Input() dialogues: Dialogue[];
  @Input() messages: Message[];
  @Input() loggedUser: User;
  url = constants.url;
  @Output() openDialogueEmitter: EventEmitter<number> = new EventEmitter<number>();

  openDialogue(id: number) {
    this.openDialogueEmitter.emit(id);
  }
}
