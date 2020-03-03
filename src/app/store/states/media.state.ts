import {LastPhoto} from '../../interfaces/lastPhoto';
import {SafeUrl} from '@angular/platform-browser';
import {Photo} from '../../interfaces/photo';

export interface MediaState {
  lastPhotos: LastPhoto[];
  blobs: SafeUrl[];
  selectedFiles: FileList[];
  photos: Photo[];
  selectedPhoto: Photo;
}

export const initialState: MediaState = {
  lastPhotos: [],
  blobs: [],
  selectedFiles: [],
  photos: [],
  selectedPhoto: null,
};

