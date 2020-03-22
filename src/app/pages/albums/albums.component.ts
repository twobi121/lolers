import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {User} from '../../interfaces/user';
import {constants} from '../../shared/constants/constants';
import {Album} from '../../interfaces/album';
import {SortedPhotos} from '../../interfaces/sortedPhotos';
import {Photo} from '../../interfaces/photo';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit, OnChanges {
  @Input() user: User;
  @Input() loggedUser: User;
  @Input() albums: Album[];
  @Input() sortedPhotos: SortedPhotos[];
  @Input() photos: Photo[];
  @Output() onFileChangedEmitter: EventEmitter<Event> = new EventEmitter<Event>();
  @Output() getAlbumsEmitter: EventEmitter<number> = new EventEmitter<number>();
  @Output() getCurrentUserEmitter: EventEmitter<void> = new EventEmitter<void>();
  url = constants.url;

  ngOnInit() {
    if (!this.user) {
      this.getCurrentUserEmitter.emit();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // @ts-ignore
    if (changes.user && changes.user.currentValue) {
      this.getAlbumsEmitter.emit(this.user._id);
    }
  }

  onFileChanged($event: Event) {
    this.onFileChangedEmitter.emit($event);
    this.getAlbumsEmitter.emit(this.user._id);
  }
}
