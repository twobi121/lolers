import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Request} from '../../interfaces/request';
import {constants} from '../../shared/constants/constants';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent {
  @Input() requests: Request[];
  @Output() closeEmitter: EventEmitter<Event> = new EventEmitter<Event>();
  @Output() acceptEmitter: EventEmitter<number> = new EventEmitter<number>();
  @Output() declineEmitter: EventEmitter<number> = new EventEmitter<number>();
  url = constants.url;

  close($event: Event) {
    this.closeEmitter.emit($event);
  }

  accept(id: number) {
   this.acceptEmitter.emit(id);
  }

  decline(id: number) {
    this.declineEmitter.emit(id);
  }
}

