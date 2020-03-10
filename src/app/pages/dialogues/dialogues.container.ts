import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import {constants} from '../../shared/constants/constants';
import {Observable, Subject} from 'rxjs';
import {ChatService} from '../../services/chat.service';
import {State} from '../../store/states/app.state';
import {Store} from '@ngrx/store';
import {Dialogue} from '../../interfaces/dialogue';
import {selectMessages, selectRooms} from '../../store/dialogues/selectors';
import {GetDialoguesAction, GetMessagesAction} from '../../store/dialogues/actions';
import {User} from '../../interfaces/user';
import {selectLoggedUser} from '../../store/users/selectors';
import {Message} from '../../interfaces/message';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dialogues-container',
  template: `<app-dialogues (openDialogueEmitter)="openDialogue($event)"
                            [dialogues]="dialogues$ | async"
                            [messages]="messages$ | async"
                            [loggedUser]="loggedUser$ | async"
                            ></app-dialogues>`,
  styleUrls: ['./dialogues.component.css']
})
export class DialoguesContainer implements OnInit {
  dialogues$: Observable<Dialogue[]> = this.store.select(selectRooms);
  messages$: Observable<Message[]> = this.store.select(selectMessages);
  loggedUser$: Observable<User> = this.store.select(selectLoggedUser);

  constructor(private store: Store<State>,
              private router: Router) { }

  ngOnInit() {
    this.store.dispatch(new GetDialoguesAction());
    // this.chat.messages.subscribe(msg => {
    //   console.log(msg);
    // });
  }

  sendMessage() {
    // this.chat.sendMsg('Test Message');
  }

  openDialogue(id: number) {
    this.store.dispatch(new GetMessagesAction(id));
    this.router.navigate([], {} );
  }

}
