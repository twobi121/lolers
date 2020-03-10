import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Message} from '../../interfaces/message';
import {selectActiveDialogue, selectDialogueMembers, selectMessages} from '../../store/dialogues/selectors';
import {Store} from '@ngrx/store';
import {State} from '../../store/states/app.state';
import {User} from '../../interfaces/user';
import {selectLoggedUser} from '../../store/users/selectors';
import {Dialogue} from '../../interfaces/dialogue';
import {ChatService} from '../../services/chat.service';
import {AddMessageAction} from '../../store/dialogues/actions';

@Component({
  selector: 'app-dialogue-container',
  template: `<app-dialogue   (setConnectionEmitter)="setConnection($event)"
                            (sendMessageEmitter)="sendMessage($event)"
                            [messages]="messages$|async"
                           [loggedUser]="loggedUser$|async"
                           [activeDialogue]="activeDialogue$|async"
                           [dialogueMembers]="dialogueMembers$|async"
                            ></app-dialogue>`,
  styleUrls: ['./dialogue.component.css']
})
export class DialogueContainer implements OnDestroy {
  messages$: Observable<Message[]> = this.store.select(selectMessages);
  loggedUser$: Observable<User> = this.store.select(selectLoggedUser);
  activeDialogue$: Observable<Dialogue> = this.store.select(selectActiveDialogue);
  dialogueMembers$: Observable<User[]> = this.store.select(selectDialogueMembers);
  subs: Subscription[] = [];
  messages = [];
  constructor(private store: Store<State>,
              private chat: ChatService) { }

  setConnection(id: number) {
    this.chat.setConnection(id);
    this.chat.getMessages()
      .subscribe((message: Message) => {
        this.store.dispatch(new AddMessageAction(message));
      });
  }

  sendMessage(message: Message) {
    this.chat.sendMessage(message);
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

}
