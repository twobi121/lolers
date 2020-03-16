import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {User} from '../../interfaces/user';
import {State} from '../../store/states/app.state';
import {Store} from '@ngrx/store';
import {constants} from '../../shared/constants/constants';
import {UploadAvatarAction} from '../../store/users/actions';
import {Router} from '@angular/router';
import {StartDialogueAction} from '../../store/dialogues/actions';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})

export class AvatarComponent implements OnChanges{
  @Input() user: User;
  @Input() loggedUser: User;
  @Input() dialogueId: number;
  avatarBlob: SafeUrl;
  preview: SafeUrl;
  selectedFile: object;
  url = constants.url;

  constructor(private sanitizer: DomSanitizer,
              private store: Store<State>,
              private router: Router) { }


  ngOnChanges(changes: SimpleChanges): void {
    if (this.dialogueId) {
      this.router.navigateByUrl(`/user/${this.loggedUser._id}/dialogues/${this.dialogueId}`);
    }
  }

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

  startDialogue() {
    if (this.dialogueId) {
      this.router.navigateByUrl(`/user/${this.loggedUser._id}/dialogues/${this.dialogueId}`);
    } else this.store.dispatch(new StartDialogueAction(this.user._id));
  }
}

