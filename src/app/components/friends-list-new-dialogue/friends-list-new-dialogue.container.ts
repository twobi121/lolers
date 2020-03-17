import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {State} from '../../store/states/app.state';
import {select, Store} from '@ngrx/store';
import {User} from '../../interfaces/user';
import {GetFriendsWithoutDialogueAction} from '../../store/users/actions';
import {selectFriendsWithoutDialogue} from '../../store/users/selectors';
import {StartDialogueAction} from '../../store/dialogues/actions';


@Component({
  selector: 'app-friends-list-new-dialogue-container',
  template: `<app-friends-list-new-dialogue
    (closeNewDialogueEmitter)="closeNewDialogue()"
    (startNewDialogueEmitter)="startNewDialogue($event)"
    (getMoreFriendsEmitter)="getFriendsWithoutDialogues($event)"
    [friends]="(friends$ | async)"></app-friends-list-new-dialogue>`,
  styleUrls: ['./friends-list-new-dialogue.component.css']
})
export class FriendsListNewDialogueContainer implements OnInit {
  friends$ = this.store.pipe(select(selectFriendsWithoutDialogue));
  @Input() loggedUser: User;
  @Output() closeNewDialogueEmitter: EventEmitter<void> = new EventEmitter<void>();

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.getFriendsWithoutDialogues(0);
  }

  getFriendsWithoutDialogues(skipValue: number) {
    this.store.dispatch(new GetFriendsWithoutDialogueAction(skipValue));
  }

  closeNewDialogue() {
    this.closeNewDialogueEmitter.emit();
  }

  startNewDialogue(ids: number[]) {
    this.store.dispatch(new StartDialogueAction(ids));
    this.closeNewDialogue();
  }
}
