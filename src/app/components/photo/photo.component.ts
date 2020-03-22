import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {ActivatedRoute, ParamMap, Params, Router} from '@angular/router';
import {User} from '../../interfaces/user';
import {constants} from '../../shared/constants/constants';
import {Photo} from '../../interfaces/photo';
import {Album} from '../../interfaces/album';
import {Location} from '@angular/common';
import {Preview} from '../../interfaces/preview';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})

export class PhotoComponent implements OnChanges {
 @Input() user: User;
 @Input() loggedUser: User;
 @Input() photos: Photo[];
 @Input() albums: Album[];
 @Input() selectedPhoto: Photo;
 @Input() currentAlbum: Album;
 @Input() deleteStatus: boolean;
 @Input() albumUpdateStatus: boolean;
 url = constants.url;
 @Output() setSelectedPhotoEmitter: EventEmitter<string> = new EventEmitter<string>();
 @Output() switchPhotoEmitter: EventEmitter<string> = new EventEmitter<string>();
 @Output() deletePhotoEmitter: EventEmitter<number> = new EventEmitter<number>();
 @Output() setAlbumPreviewEmitter: EventEmitter<Preview> = new EventEmitter<Preview>();
 @Output() closePhotoEmitter: EventEmitter<string> = new EventEmitter<string>();
 @Output() setLikeEmitter: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.photos && changes.photos.currentValue.length && changes.photos.currentValue !== changes.photos.previousValue && !this.selectedPhoto) {
      this.setSelectedPhotoEmitter.emit();
    }

    if (changes.selectedPhoto && changes.selectedPhoto.currentValue !== changes.selectedPhoto.previousValue && this.selectedPhoto) {
      // @ts-ignore
      this.router.navigateByUrl(this.router.url.replace(this.route.url.value[0].path,  this.selectedPhoto.filename));
    }
  }

  switchPhoto(move: string) {
    this.switchPhotoEmitter.emit(move);
  }

  closePhoto(event: any) {
    const target = event.target.className;
    if (target === 'fas fa-times close_btn' || target === 'upload_modal_overlay' ) {
      this.closePhotoEmitter.emit(this.selectedPhoto.filename);
    }
    event.stopPropagation();
  }

  deletePhoto() {
    this.deletePhotoEmitter.emit(this.selectedPhoto._id);
  }

  setPreview() {
    this.setAlbumPreviewEmitter.emit({filename: this.selectedPhoto.filename, albumId: this.currentAlbum._id});
  }

  setLike() {
    this.setLikeEmitter.emit(this.selectedPhoto._id);
  }

}
