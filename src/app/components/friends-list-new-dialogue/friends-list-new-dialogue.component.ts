import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {User} from '../../interfaces/user';
import {constants} from '../../shared/constants/constants';
import {NgForm} from '@angular/forms';
import {Dialogue} from '../../interfaces/dialogue';

@Component({
  selector: 'app-friends-list-new-dialogue',
  templateUrl: './friends-list-new-dialogue.component.html',
  styleUrls: ['./friends-list-new-dialogue.component.scss']
})
export class FriendsListNewDialogueComponent {
  @Input() friends: User[];
  @Input() dialogueId: Dialogue;
  @Output() closeNewDialogueEmitter: EventEmitter<void> = new EventEmitter<void>();
  @Output() startNewDialogueEmitter: EventEmitter<number[]> = new EventEmitter<number[]>();
  @Output() getMoreFriendsEmitter: EventEmitter<number> = new EventEmitter<number>();
  @Output() redirectToDialogueEmitter: EventEmitter<number> = new EventEmitter<number>();
  url = constants.url;
  constructor() { }



  startDialogue(form: NgForm) {
    let ids = [];
    for (const key in form.form.value) {
      if (form.form.value[key]) {
        ids = ids.concat(key);
      }
    }
    this.startNewDialogueEmitter.emit(ids);
  }

  close() {
    this.closeNewDialogueEmitter.emit();
  }

  onScroll(event: any) {
    if (event.target.scrollHeight === event.target.scrollTop + event.target.clientHeight ) {
      this.getMoreFriendsEmitter.emit(this.friends.length);
    }
  }
}
