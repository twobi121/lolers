import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../interfaces/user';
import {constants} from '../../shared/constants/constants';
import {Album} from '../../interfaces/album';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit{
  @Input() user: User;
  @Input() loggedUser: User;
  @Input() currentAlbum: Album;
  @Input() albumDeleteStatus: boolean;
  @Output() onFileChangedEmitter: EventEmitter<Event> = new EventEmitter<Event>();
  @Output() deleteAlbumEmitter: EventEmitter<number> = new EventEmitter<number>();
  @Output() getCurrentUserEmitter: EventEmitter<void> = new EventEmitter<void>();
  url = constants.url;
  name: string;
  status = false;
  status1 = false;

  ngOnInit() {
    if (!this.user) {
      this.getCurrentUserEmitter.emit();
    }
  }

  onFileChanged($event: Event) {
    this.onFileChangedEmitter.emit($event);
  }

  delete() {
    this.deleteAlbumEmitter.emit(this.currentAlbum._id);
  }

  showInput() {
    const state = false;
    return !state;
  }

  updateAlbum(element: HTMLInputElement) {
    if (element.name === 'name') {
      // @ts-ignore
      this.heroService.updateAlbum({id: this.album[0]._id, name: element.value});
      this.status = false;
    } else {
      // @ts-ignore
      this.heroService.updateAlbum({id: this.album[0]._id, description: element.value});
      this.status1 = false;
    }
  }
}
