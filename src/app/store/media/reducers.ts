import {Actions as actions, ActionTypes} from './actions';
import {ActionTypes as ActionsUsersTypes} from '../users/actions';
import {MediaState, initialState} from '../states/media.state';
import {LastPhoto} from '../../interfaces/lastPhoto';
import {SafeUrl} from '@angular/platform-browser';

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
        blobs: [] as SafeUrl[]
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
    case ActionsUsersTypes.LOGOUT_SUCCESS:
      return initialState;
    default:
      return state;
  }
}
