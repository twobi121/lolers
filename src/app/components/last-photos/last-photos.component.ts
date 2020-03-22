import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from '../../interfaces/user';
import {LastPhoto} from '../../interfaces/lastPhoto';
import {constants} from '../../shared/constants/constants';

@Component({
  selector: 'app-last-photos',
  templateUrl: './last-photos.component.html',
  styleUrls: ['./last-photos.component.scss']
})
export class LastPhotosComponent{
  @Input() user: User;
  @Input() loggedUser: User;
  @Input() lastPhotos: LastPhoto[];
  @Output() onFileChangedEmitter: EventEmitter<Event> = new EventEmitter<Event>();
  @Input() selectedFiles: FileList[];
  url = constants.url;

  onFileChanged($event: Event) {
    this.onFileChangedEmitter.emit($event);
  }





}
