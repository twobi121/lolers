import {Actions as actions, ActionTypes} from './actions';
import {ActionTypes as ActionsUsersTypes} from '../users/actions';
import {MediaState, initialState} from '../states/media.state';
import {LastPhoto} from '../../interfaces/lastPhoto';
import {Blob} from '../../interfaces/blob';

export function reducer(state: MediaState = initialState, action: actions): MediaState {
  switch (action.type) {
    case ActionTypes.GET_LAST_PHOTOS:
      return {
        ...state,
        lastPhotos: [] as LastPhoto[]
      };
    case ActionTypes.GET_LAST_PHOTOS_SUCCESS:
      return {
        ...state,
        lastPhotos: action.payload
      };
    case ActionTypes.GET_LAST_PHOTOS_FAILURE:
      return {
        ...state,
        lastPhotos: [] as LastPhoto[]
      };
    case ActionTypes.SET_BLOBS:
      return {
        ...state,
        blobs: action.payload
      };
    case ActionTypes.SET_BLOBS_SUCCESS:
      return {
        ...state,
        blobs: action.payload
      };
    case ActionTypes.SET_BLOBS_FAILURE:
      return {
        ...state,
        blobs: [] as Blob[]
      };
    case ActionTypes.SET_SELECTED_FILES:
      return {
        ...state,
        selectedFiles: action.payload
      };
    case ActionTypes.SET_SELECTED_FILES_SUCCESS:
      return {
        ...state,
        selectedFiles: action.payload
      };
    case ActionTypes.SET_SELECTED_FILES_FAILURE:
      return {
        ...state,
        selectedFiles: [] as FileList[]
      };
    case ActionTypes.SET_SELECTED_PHOTO:
      return {
        ...state,
        selectedPhoto: state.photos.find(item => item.filename === action.payload),
        albumUpdateStatus: false
      };
    case ActionTypes.UNSET_SELECTED_PHOTO:
      return {
        ...state,
        selectedPhoto: null
      };
    case ActionsUsersTypes.LOGOUT_SUCCESS:
      return initialState;
    case ActionTypes.SWITCH_PHOTO: {
      let idx = state.photos.findIndex(item => item === state.selectedPhoto );
      if (action.payload === 'back') {
        idx = (idx === 0) ? state.photos.length - 1 : idx - 1;
      } else if (action.payload === 'next') {
        idx = (idx + 1 === state.photos.length) ? 0 : idx + 1;
      }
      return {
        ...state,
        selectedPhoto: state.photos[idx],
        deleteStatus: false,
      };
    }
    case ActionTypes.DELETE_PHOTO_SUCCESS: {
      const idx = state.photos.indexOf(state.selectedPhoto);
      return {
        ...state,
        photos: state.photos.splice(idx, 1),
        deleteStatus: true,
        selectedPhoto: null
      };
    }
    case ActionTypes.SET_ALBUM_PREVIEW_SUCCESS: {
      return {
        ...state,
        albumUpdateStatus: true
      };
    }
    case ActionTypes.GET_CURRENT_ALBUM_SUCCESS: {
      return {
        ...state,
        albumDeleteStatus: false,
        photos: action.payload.photos,
        currentAlbum: action.payload
      };
    }
    case ActionTypes.GET_CURRENT_ALBUM_FAILURE: {
      return {
        ...state,
        currentAlbum: null
      };
    }
    case ActionTypes.DELETE_ALBUM_SUCCESS: {
      return {
        ...state,
        currentAlbum: null,
        albumDeleteStatus: true
      };
    }
    case ActionTypes.GET_ALBUMS_WITH_PHOTOS_SUCCESS: {
      return {
        ...state,
        albums: action.payload.albums,
        sortedPhotos: action.payload.sortedPhotos,
        photos: action.payload.sortedPhotos.reduce((acc, elem) => acc.concat(elem.photos), []),
      };
    }
    case ActionTypes.GET_ALBUMS_SUCCESS: {
      return {
        ...state,
        albums: action.payload
      };
    }
    case ActionTypes.UPLOAD_SUCCESS: {
      state.blobs[action.payload].loaded = true;
      return {
        ...state,
      };
    }
    case ActionTypes.SET_LIKE_SUCCESS: {
      if (state.photos.length) {
        const idx = state.photos.findIndex(photo => photo._id === action.payload.id);
        state.photos[idx].isLiked = action.payload.isLiked;
        action.payload.isLiked ? ++state.photos[idx].likes : --state.photos[idx].likes;
      }

      if (state.currentAlbum && state.currentAlbum.photos.length) {
        const idx = state.currentAlbum.photos.findIndex(photo => photo._id === action.payload.id);
        state.currentAlbum.photos[idx].isLiked = action.payload.isLiked;
      }

      if (state.selectedPhoto) {
        state.selectedPhoto.isLiked = action.payload.isLiked;
      }

      return {...state};
    }
    default:
      return state;
  }
}
