import {LastPhoto} from '../../interfaces/lastPhoto';
import {Photo} from '../../interfaces/photo';
import {Album} from '../../interfaces/album';
import {SortedPhotos} from '../../interfaces/sortedPhotos';
import {Blob} from '../../interfaces/blob';

export interface MediaState {
  lastPhotos: LastPhoto[];
  blobs: Blob[];
  selectedFiles: FileList[];
  photos: Photo[];
  selectedPhoto: Photo;
  albums: Album[];
  currentAlbum: Album;
  deleteStatus: boolean;
  albumDeleteStatus: boolean;
  albumUpdateStatus: boolean;
  sortedPhotos: SortedPhotos[];
}

export const initialState: MediaState = {
  lastPhotos: [],
  blobs: [],
  selectedFiles: [],
  photos: [],
  selectedPhoto: null,
  albums: [],
  currentAlbum: null,
  deleteStatus: false,
  albumDeleteStatus: false,
  albumUpdateStatus: false,
  sortedPhotos: [],
};

