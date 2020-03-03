import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, ParamMap, Params, Router} from '@angular/router';
import {DataService} from '../../services/data-service';
import {User} from '../../interfaces/user';
import {constants} from '../../shared/constants/constants';
import {Photo} from '../../interfaces/photo';
import {Album} from '../../interfaces/album';



@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {
 @Input() user: User;
 @Input() loggedUser: User;
 @Input() photos: Photo[];
 @Input() albums: Album[];
 @Input() selectedPhoto: Photo;
 @Input() currentAlbum: Album;
 @Input() deleteStatus: boolean;
 url = constants.url;
 @Output() switchPhotoEmitter: EventEmitter<string> = new EventEmitter<string>();
 @Output() deletePhotoEmitter: EventEmitter<void> = new EventEmitter<void>();
 @Output() setAlbumPreviewEmitter: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  switchPhoto(move: string) {
    this.switchPhotoEmitter.emit(move);
    console.log(this.router);
  }

  closePhoto(event: any ) {
    const target = event.target.className;
    if (target === 'fas fa-times close_btn' || target === 'upload_modal_overlay' ) {
      this.router.navigateByUrl(this.router.url.replace(this.selectedPhoto.filename,  '/'));
    }
    event.stopPropagation();
  }

  deletePhoto() {
    this.deletePhotoEmitter.emit();
  }

  setPreview() {
    this.setAlbumPreviewEmitter.emit();
  }

}
