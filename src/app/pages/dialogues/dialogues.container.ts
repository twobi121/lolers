import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import * as io from 'socket.io-client';
import {constants} from '../../shared/constants/constants';
import {Observable, Subject} from 'rxjs';
import {ChatService} from '../../services/chat.service';
import {State} from '../../store/states/app.state';
import {Store} from '@ngrx/store';
import {Dialogue} from '../../interfaces/dialogue';
import {selectDialogueId, selectMessages, selectRooms} from '../../store/dialogues/selectors';
import {GetDialoguesAction, GetDialoguesFailureAction, SetDialogueAction} from '../../store/dialogues/actions';
import {User} from '../../interfaces/user';
import {selectLoggedUser} from '../../store/users/selectors';
import {Message} from '../../interfaces/message';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {GetFriendsWithoutDialogueFailureAction} from '../../store/users/actions';

@Component({
  selector: 'app-dialogues-container',
  template: `<app-dialogues (getDialoguesEmitter)="getDialogues($event)"
                            (setDialogueEmitter)="setActiveDialogue($event)"
                            (closeNewDialogueEmitter)="closeNewDialogue()"
                            [dialogues]="dialogues$ | async"
                            [loggedUser]="loggedUser$ | async"
                            [dialogueId]="dialogueId$ | async"
                            ></app-dialogues>`,
  styleUrls: ['./dialogues.component.css']
})
export class DialoguesContainer implements OnInit, OnDestroy {
  dialogues$: Observable<Dialogue[]> = this.store.select(selectRooms);
  loggedUser$: Observable<User> = this.store.select(selectLoggedUser);
  dialogueId$: Observable<number> = this.store.select(selectDialogueId);

  constructor(private store: Store<State>,
              ) { }

  ngOnInit() {
    this.getDialogues(0);
  }

  getDialogues(skipValue: number) {
    this.store.dispatch(new GetDialoguesAction(skipValue));
  }

  setActiveDialogue(id: string) {
    this.store.dispatch(new SetDialogueAction(id));
  }

  closeNewDialogue() {
    this.store.dispatch(new GetFriendsWithoutDialogueFailureAction());
  }

  ngOnDestroy() {
    this.store.dispatch(new GetDialoguesFailureAction());
  }

}
