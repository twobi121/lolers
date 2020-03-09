import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import * as io from 'socket.io-client';
import {constants} from '../../shared/constants/constants';
import {Observable, Subject} from 'rxjs';
import {ChatService} from '../../services/chat.service';
import {Dialogue} from '../../interfaces/dialogue';
import {User} from '../../interfaces/user';

@Component({
  selector: 'app-dialogues',
  templateUrl: './dialogues.component.html',
  styleUrls: ['./dialogues.component.css']
})
export class DialoguesComponent implements OnChanges{
  @Input() dialogues: Dialogue[];
  @Input() loggedUser: User;
  url = constants.url;
  messages = '';

  ngOnChanges(changes: SimpleChanges): void {
  }
}
