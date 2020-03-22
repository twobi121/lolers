import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {SafeUrl} from '@angular/platform-browser';
import {Album} from '../../interfaces/album';
import {constants} from '../../shared/constants/constants';
import {UploadObject} from '../../interfaces/uploadObject';
import {User} from '../../interfaces/user';
import {Blob} from '../../interfaces/blob';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit, OnChanges {
  @Input() selectedFiles: FileList[];
  @Input() blobs: Blob[];
  @Input() albums: Album[];
  @Input() currentAlbum: Album;
  @Input() loggedUser: User;
  @Output() uploadEmitter: EventEmitter<object> = new EventEmitter<object>();
  @Output() getAlbumsEmitter: EventEmitter<number> = new EventEmitter<number>();
  selectedValue: number;
  url = constants.url;
  loading = false;
  constructor(
  ) { }

  ngOnInit() {
    if (this.currentAlbum) {
      this.selectedValue = this.currentAlbum._id;
    }

    if (!this.albums.length) {
      this.getAlbumsEmitter.emit(this.loggedUser._id);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.albums && changes.albums.currentValue.length) {
      this.selectedValue = this.albums[0]._id;
    }
  }

  upload() {
    const obj = {
      files: this.selectedFiles,
      albumId: this.selectedValue
    };
    this.uploadEmitter.emit(obj);
    this.loading = true;
  }

}
