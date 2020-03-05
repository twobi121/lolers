import {createSelector} from '@ngrx/store';
import {State} from '../states/app.state';
import {MediaState} from '../states/media.state';

const selectMedia = (state: State) => state.media;

export const selectLastPhotos = createSelector(
  selectMedia,
  (state: MediaState) => state ? state.lastPhotos : []
);

export const selectBlobs = createSelector(
  selectMedia,
  (state: MediaState) => state ? state.blobs : []
);

export const selectSelectedFiles = createSelector(
  selectMedia,
  (state: MediaState) => state ? state.selectedFiles : []
);

export const selectPhotos = createSelector(
  selectMedia,
  (state: MediaState) => state ? state.photos : []
);

export const selectAlbums = createSelector(
  selectMedia,
  (state: MediaState) => state ? state.albums : []
);

export const selectSelectedPhoto = createSelector(
  selectMedia,
  (state: MediaState) => state ? state.selectedPhoto : null
);

export const selectCurrentAlbum = createSelector(
  selectMedia,
  (state: MediaState) => state ? state.currentAlbum : null
);

export const selectDeleteStatus = createSelector(
  selectMedia,
  (state: MediaState) => state ? state.deleteStatus : false
);

export const selectAlbumDeleteStatus = createSelector(
  selectMedia,
  (state: MediaState) => state ? state.albumDeleteStatus : false
);

export const selectSortedPhotos = createSelector(
  selectMedia,
  (state: MediaState) => state ? state.sortedPhotos : []
);

export const selectAlbumUpdatedStatus = createSelector(
  selectMedia,
  (state: MediaState) => state ? state.albumUpdateStatus : false
);
