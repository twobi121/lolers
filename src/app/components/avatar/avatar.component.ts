import {Component, Input} from '@angular/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {User} from '../../interfaces/user';
import {State} from '../../store/states/app.state';
import {Store} from '@ngrx/store';
import {constants} from '../../shared/constants/constants';
import {UploadAvatarAction} from '../../store/users/actions';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})

export class AvatarComponent {
  @Input() user: User;
  @Input() loggedUser: User;
  avatarBlob: SafeUrl;
  preview: SafeUrl;
  selectedFile: object;
  url = constants.url;

  constructor(private sanitizer: DomSanitizer,
              private store: Store<State>) { }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile ) {
      this.preview = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.selectedFile));
    }
  }

  unselectFile(fileInput: HTMLInputElement) {
    this.selectedFile = null;
    fileInput.value = '';
  }

  upload() {
    this.store.dispatch(new UploadAvatarAction(this.selectedFile));
  }

}
