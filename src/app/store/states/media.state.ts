import {LastPhoto} from '../../interfaces/lastPhoto';
import {SafeUrl} from '@angular/platform-browser';

export interface MediaState {
  lastPhotos: LastPhoto[];
  blobs: SafeUrl[];
  selectedFiles: FileList[];
}

export const initialState: MediaState = {
  lastPhotos: [],
  blobs: [],
  selectedFiles: [],
};

