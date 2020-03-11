import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import * as io from 'socket.io-client';
import {constants} from '../../shared/constants/constants';
import {Observable, Subject} from 'rxjs';
import {ChatService} from '../../services/chat.service';
import {State} from '../../store/states/app.state';
import {Store} from '@ngrx/store';
import {Dialogue} from '../../interfaces/dialogue';
import {selectMessages, selectRooms} from '../../store/dialogues/selectors';
import {GetDialoguesAction, GetMessagesAction, SetDialogueAction} from '../../store/dialogues/actions';
import {User} from '../../interfaces/user';
import {selectLoggedUser} from '../../store/users/selectors';
import {Message} from '../../interfaces/message';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'app-dialogues-container',
  template: `<app-dialogues (setDialogueEmitter)="setActiveDialogue($event)"
                            [dialogues]="dialogues$ | async"
                            [loggedUser]="loggedUser$ | async"
                            ></app-dialogues>`,
  styleUrls: ['./dialogues.component.css']
})
export class DialoguesContainer implements OnInit {
  dialogues$: Observable<Dialogue[]> = this.store.select(selectRooms);
  loggedUser$: Observable<User> = this.store.select(selectLoggedUser);

  constructor(private store: Store<State>,
              ) { }

  ngOnInit() {
    this.getDialogues();
  }

  getDialogues() {
    this.store.dispatch(new GetDialoguesAction());
  }

  setActiveDialogue(id: string) {
    this.store.dispatch(new SetDialogueAction(id));
  }

}
