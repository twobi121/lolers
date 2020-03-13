import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Message} from '../../interfaces/message';
import {selectActiveDialogue, selectMessages} from '../../store/dialogues/selectors';
import {Store} from '@ngrx/store';
import {State} from '../../store/states/app.state';
import {User} from '../../interfaces/user';
import {selectLoggedUser} from '../../store/users/selectors';
import {Dialogue} from '../../interfaces/dialogue';
import {ChatService} from '../../services/chat.service';
import {SetMessagesAsReadAction, SubscribeGetMessagesAction} from '../../store/dialogues/actions';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {JoinRoomAction, LeaveRoomAction, SendMessageAction, SubscribeMessagesAction} from '../../store/socket/actions';

@Component({
  selector: 'app-dialogue-container',
  template: `<app-dialogue (sendMessageEmitter)="sendMessage($event)"
                           (setMessagesAsReadEmitter)="setMessagesAsRead($event)"
                            [messages]="messages$|async"
                           [loggedUser]="loggedUser$|async"
                           [activeDialogue]="activeDialogue$|async"
                            ></app-dialogue>`,
  styleUrls: ['./dialogue.component.css']
})
export class DialogueContainer implements OnInit, OnDestroy {
  messages$: Observable<Message[]> = this.store.select(selectMessages);
  loggedUser$: Observable<User> = this.store.select(selectLoggedUser);
  activeDialogue$: Observable<Dialogue> = this.store.select(selectActiveDialogue);
  subs: Subscription[] = [];
  constructor(private store: Store<State>,
              private chat: ChatService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getLastMessages();
    this.joinRoom();
    this.subscribeMessages();
  }

  joinRoom() {
    this.subs.push(
      this.route.paramMap.subscribe((params: ParamMap) => {
        this.store.dispatch(new LeaveRoomAction());
        this.store.dispatch(new JoinRoomAction(params.get('id')));
      })
    );
  }

  getLastMessages() {
    this.store.dispatch(new SubscribeGetMessagesAction());
    // this.subs.push(
    //   this.route.paramMap.subscribe((params: ParamMap) => {
    //     this.store.dispatch(new GetMessagesAction(params.get('id')));
    //   })
    // );
  }

  subscribeMessages() {
    this.store.dispatch(new SubscribeMessagesAction());
  }

  sendMessage(message: Message) {
    this.store.dispatch(new SendMessageAction(message));
  }

  setMessagesAsRead(id: number) {
    this.store.dispatch(new SetMessagesAsReadAction(id));
  }

  ngOnDestroy() {
    this.store.dispatch(new LeaveRoomAction());
    this.subs.forEach(sub => sub.unsubscribe());
  }

}
