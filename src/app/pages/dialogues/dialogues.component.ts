import {Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges} from '@angular/core';
import {constants} from '../../shared/constants/constants';
import {Dialogue} from '../../interfaces/dialogue';
import {User} from '../../interfaces/user';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-dialogues',
  templateUrl: './dialogues.component.html',
  styleUrls: ['./dialogues.component.css']
})
export class DialoguesComponent implements OnChanges, OnDestroy {
  @Input() dialogues: Dialogue[];
  @Input() loggedUser: User;
  @Output() setDialogueEmitter: EventEmitter<string> = new EventEmitter<string>();
  url = constants.url;
  subs: Subscription[] = [];
  constructor(private route: ActivatedRoute) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // @ts-ignore
    if (changes.dialogues && changes.dialogues.currentValue.length && this.route.firstChild && this.route.firstChild.params.value) {
        this.subs.push(
          this.route.firstChild.paramMap.subscribe((params: ParamMap) => {
          this.setActiveDialogue(params.get('id'));
        }));
      }
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  setActiveDialogue(id: string) {
    this.setDialogueEmitter.emit(id);
  }
}
