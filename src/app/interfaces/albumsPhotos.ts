import {Album} from './album';
import {Photo} from './photo';
import {SortedPhotos} from './sortedPhotos';

export interface AlbumsPhotos {
  albums: Album[];
  photos: SortedPhotos[];
}
