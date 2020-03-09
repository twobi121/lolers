import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import {constants} from '../../shared/constants/constants';
import {Observable, Subject} from 'rxjs';
import {ChatService} from '../../services/chat.service';
import {State} from '../../store/states/app.state';
import {Store} from '@ngrx/store';
import {Dialogue} from '../../interfaces/dialogue';
import {selectRooms} from '../../store/dialogues/selectors';
import {GetDialoguesAction} from '../../store/dialogues/actions';
import {User} from '../../interfaces/user';
import {selectLoggedUser} from '../../store/users/selectors';

@Component({
  selector: 'app-dialogues-container',
  template: `<app-dialogues [dialogues]="dialogues$ | async"
                            [loggedUser]="loggedUser$ | async"></app-dialogues>`,
  styleUrls: ['./dialogues.component.css']
})
export class DialoguesContainer implements OnInit {
  dialogues$: Observable<Dialogue[]> = this.store.select(selectRooms);
  loggedUser$: Observable<User> = this.store.select(selectLoggedUser);
  private socket;

  constructor(private chat: ChatService,
              private store: Store<State>) { }

  ngOnInit() {
    this.store.dispatch(new GetDialoguesAction());
    // this.chat.messages.subscribe(msg => {
    //   console.log(msg);
    // });
  }

  sendMessage() {
    this.chat.sendMsg('Test Message');
  }

}
