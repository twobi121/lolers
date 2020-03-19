import {Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges} from '@angular/core';
import {constants} from '../../shared/constants/constants';
import {Dialogue} from '../../interfaces/dialogue';
import {User} from '../../interfaces/user';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-dialogues',
  templateUrl: './dialogues.component.html',
  styleUrls: ['./dialogues.component.css']
})
export class DialoguesComponent implements OnChanges, OnDestroy {
  @Input() dialogues: Dialogue[];
  @Input() loggedUser: User;
  @Input() dialogueId: number;
  @Output() setDialogueEmitter: EventEmitter<string> = new EventEmitter<string>();
  @Output() closeNewDialogueEmitter: EventEmitter<void> = new EventEmitter<void>();
  @Output() getDialoguesEmitter: EventEmitter<number> = new EventEmitter<number>();
  newDialogue = false;
  url = constants.url;
  subs: Subscription[] = [];
  constructor(private route: ActivatedRoute,
              private router: Router) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    // @ts-ignore
    if (changes.dialogues && changes.dialogues.currentValue && changes.dialogues.currentValue.length && this.route.firstChild && this.route.firstChild.params.value) {
        this.subs.push(
          this.route.firstChild.paramMap.subscribe((params: ParamMap) => {
          this.setActiveDialogue(params.get('id'));
        }));
    }

    if (changes.dialogueId && changes.dialogueId.previousValue === 0 && changes.dialogueId.currentValue) {
      this.router.navigate([`/user/${this.loggedUser._id}/dialogues/${this.dialogueId}`]);
    }

  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  setActiveDialogue(id: string) {
    this.setDialogueEmitter.emit(id);
  }

  onScroll(event: any) {
    if (event.target.scrollHeight === event.target.scrollTop + event.target.clientHeight ) {
      this.getDialoguesEmitter.emit(this.dialogues.length);
    }
  }

  toggleFriendsMenu() {
    this.newDialogue = !this.newDialogue;
    this.closeNewDialogueEmitter.emit();
  }
}
