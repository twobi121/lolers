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
