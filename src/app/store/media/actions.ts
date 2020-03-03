import {Action} from '@ngrx/store';
import {LastPhoto} from '../../interfaces/lastPhoto';
import {SafeUrl} from '@angular/platform-browser';

export const ActionTypes = {

  GET_LAST_PHOTOS: 'Get Last Photos',
  GET_LAST_PHOTOS_SUCCESS: 'Get Last Photos Success',
  GET_LAST_PHOTOS_FAILURE: 'Get Last Photos Failure',
  SET_BLOBS: 'Set Blobs',
  SET_BLOBS_SUCCESS: 'Set Blobs Success',
  SET_BLOBS_FAILURE: 'Set Blobs Failure',
  SET_SELECTED_FILES: 'Set Selected Files',
  SET_SELECTED_FILES_SUCCESS: 'Set Selected Files Success',
  SET_SELECTED_FILES_FAILURE: 'Set Selected Files Failure',
  SWITCH_PHOTO: 'Switch photo',
  SWITCH_PHOTO_SUCCESS: 'Switch photo success',
  SWITCH_PHOTO_FAILURE: 'Switch photo failure',
};

export class GetLastPhotosAction implements Action {
  public type = ActionTypes.GET_LAST_PHOTOS;

  constructor(public payload: number) {
  }
}

export class GetLastPhotosSuccessAction implements Action {
  public type = ActionTypes.GET_LAST_PHOTOS_SUCCESS;

  constructor(public payload: LastPhoto[]) {
  }
}

export class GetLastPhotosFailureAction implements Action {
  public type = ActionTypes.GET_LAST_PHOTOS_FAILURE;

  constructor(public payload?: any) {
  }
}

export class SetBlobsAction implements Action {
  public type = ActionTypes.SET_BLOBS;

  constructor(public payload: SafeUrl[]) {
  }
}

export class SetBlobsSuccessAction implements Action {
  public type = ActionTypes.SET_BLOBS_SUCCESS;

  constructor(public payload: SafeUrl[]) {
  }
}

export class SetBlobsFailureAction implements Action {
  public type = ActionTypes.SET_BLOBS_FAILURE;

  constructor(public payload?: any) {
  }
}

export class SetSelectedFilesAction implements Action {
  public type = ActionTypes.SET_SELECTED_FILES;

  constructor(public payload: FileList[]) {
  }
}

export class SetSelectedFilesSuccessAction implements Action {
  public type = ActionTypes.SET_SELECTED_FILES_SUCCESS;

  constructor(public payload: FileList[]) {
  }
}

export class SetSelectedFilesFailureAction implements Action {
  public type = ActionTypes.SET_SELECTED_FILES_FAILURE;

  constructor(public payload?: any) {
  }
}

export class SwitchPhotoAction implements Action {
  public type = ActionTypes.SWITCH_PHOTO;

  constructor(public payload: string) {
  }
}

export class SwitchPhotoSuccessAction implements Action {
  public type = ActionTypes.SWITCH_PHOTO_SUCCESS;

  constructor(public payload: string) {
  }
}

export class SwitchPhotoFailureAction implements Action {
  public type = ActionTypes.SWITCH_PHOTO_FAILURE;

  constructor(public payload?: any) {
  }
}

export type Actions =
  GetLastPhotosAction
  | GetLastPhotosSuccessAction
  | GetLastPhotosFailureAction
  | SetBlobsAction
  | SetBlobsSuccessAction
  | SetBlobsFailureAction
  | SetSelectedFilesAction
  | SetSelectedFilesSuccessAction
  | SetSelectedFilesFailureAction
  | SwitchPhotoAction
  | SwitchPhotoSuccessAction
  | SwitchPhotoFailureAction


