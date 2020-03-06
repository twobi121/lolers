import {Action} from '@ngrx/store';
import {LastPhoto} from '../../interfaces/lastPhoto';
import {Album} from '../../interfaces/album';
import {AlbumsPhotos} from '../../interfaces/albumsPhotos';
import {Photo} from '../../interfaces/photo';
import {Preview} from '../../interfaces/preview';
import {Blob} from '../../interfaces/blob';

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
  SET_SELECTED_PHOTO: 'Set Selected Photo',
  SET_SELECTED_PHOTO_SUCCESS: 'Set Selected Photo Success',
  SET_SELECTED_PHOTO_FAILURE: 'Set Selected Photo Failure',
  UNSET_SELECTED_PHOTO: 'Unset Selected Photo',
  UNSET_SELECTED_PHOTO_SUCCESS: 'Unset Selected Photo Success',
  UNSET_SELECTED_PHOTO_FAILURE: 'Unset Selected Photo Failure',
  SWITCH_PHOTO: 'Switch photo',
  SWITCH_PHOTO_SUCCESS: 'Switch photo success',
  SWITCH_PHOTO_FAILURE: 'Switch photo failure',
  DELETE_PHOTO: 'Delete Photo',
  DELETE_PHOTO_SUCCESS: 'Delete Photo Success',
  DELETE_PHOTO_FAILURE: 'Delete Photo Failure',
  SET_ALBUM_PREVIEW: 'Set Album Preview',
  SET_ALBUM_PREVIEW_SUCCESS:  'Set Album Preview Success',
  SET_ALBUM_PREVIEW_FAILURE: 'Set Album Preview Failure',
  GET_CURRENT_ALBUM: 'Get Current Album',
  GET_CURRENT_ALBUM_SUCCESS: 'Get Current Album Success',
  GET_CURRENT_ALBUM_FAILURE: 'Get Current Album Failure',
  DELETE_ALBUM: 'Delete Album',
  DELETE_ALBUM_SUCCESS: 'Delete Album Success',
  DELETE_ALBUM_FAILURE: 'Delete Album Failure',
  GET_ALBUMS_WITH_PHOTOS: 'Get Albums With Photos',
  GET_ALBUMS_WITH_PHOTOS_SUCCESS: 'Get Albums With Photos Success',
  GET_ALBUMS_WITH_PHOTOS_FAILURE: 'Get Albums With Photos Failure',
  GET_ALBUMS: 'Get Albums',
  GET_ALBUMS_SUCCESS: 'Get Albums Success',
  GET_ALBUMS_FAILURE: 'Get Albums Failure',
  UPLOAD: 'Upload Photo',
  UPLOAD_SUCCESS: 'Upload Photo Success',
  UPLOAD_FAILURE: 'Upload Photo Failure'
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

  constructor(public payload: Blob[]) {
  }
}

export class SetBlobsSuccessAction implements Action {
  public type = ActionTypes.SET_BLOBS_SUCCESS;

  constructor(public payload: Blob[]) {
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

export class SetSelectedPhotoAction implements Action {
  public type = ActionTypes.SET_SELECTED_PHOTO;

  constructor(public payload: string) {
  }
}

export class SetSelectedPhotoSuccessAction implements Action {
  public type = ActionTypes.SET_SELECTED_PHOTO_SUCCESS;

  constructor(public payload: Photo) {
  }
}

export class SetSelectedPhotoFailureAction implements Action {
  public type = ActionTypes.SET_SELECTED_PHOTO_FAILURE;

  constructor(public payload?: any) {
  }
}

export class UnsetSelectedPhotoAction implements Action {
  public type = ActionTypes.UNSET_SELECTED_PHOTO;

  constructor(public payload?: any) {
  }
}

export class UnsetSelectedPhotoSuccessAction implements Action {
  public type = ActionTypes.UNSET_SELECTED_PHOTO_SUCCESS;

  constructor(public payload?: any) {
  }
}

export class UnsetSelectedPhotoFailureAction implements Action {
  public type = ActionTypes.UNSET_SELECTED_PHOTO_FAILURE;

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

export class DeletePhotoAction implements Action {
  public type = ActionTypes.DELETE_PHOTO;

  constructor(public payload: number) {
  }
}

export class DeletePhotoSuccessAction implements Action {
  public type = ActionTypes.DELETE_PHOTO_SUCCESS;

  constructor(public payload?: any) {
  }
}

export class DeletePhotoFailureAction implements Action {
  public type = ActionTypes.DELETE_PHOTO_FAILURE;

  constructor(public payload?: any) {
  }
}

export class SetAlbumPreviewAction implements Action {
  public type = ActionTypes.SET_ALBUM_PREVIEW;

  constructor(public payload: Preview) {
  }
}

export class SetAlbumPreviewSuccessAction implements Action {
  public type = ActionTypes.SET_ALBUM_PREVIEW_SUCCESS;

  constructor(public payload?: any) {
  }
}

export class SetAlbumPreviewFailureAction implements Action {
  public type = ActionTypes.SET_ALBUM_PREVIEW_FAILURE;

  constructor(public payload?: any) {
  }
}

export class GetCurrentAlbumAction implements Action {
  public type = ActionTypes.GET_CURRENT_ALBUM;

  constructor(public payload: string) {
  }
}

export class GetCurrentAlbumSuccessAction implements Action {
  public type = ActionTypes.GET_CURRENT_ALBUM_SUCCESS;

  constructor(public payload: Album) {
  }
}

export class GetCurrentAlbumFailureAction implements Action {
  public type = ActionTypes.GET_CURRENT_ALBUM_FAILURE;

  constructor(public payload?: any) {
  }
}

export class DeleteAlbumAction implements Action {
  public type = ActionTypes.DELETE_ALBUM;

  constructor(public payload: number) {
  }
}

export class DeleteAlbumSuccessAction implements Action {
  public type = ActionTypes.DELETE_ALBUM_SUCCESS;

  constructor(public payload?: any) {
  }
}

export class DeleteAlbumFailureAction implements Action {
  public type = ActionTypes.DELETE_ALBUM_FAILURE;

  constructor(public payload?: any) {
  }
}

export class GetAlbumsWithPhotosAction implements Action {
  public type = ActionTypes.GET_ALBUMS_WITH_PHOTOS;

  constructor(public payload: number) {
  }
}

export class GetAlbumsWithPhotosSuccessAction implements Action {
  public type = ActionTypes.GET_ALBUMS_WITH_PHOTOS_SUCCESS;

  constructor(public payload: AlbumsPhotos) {
  }
}

export class GetAlbumsWithPhotosFailureAction implements Action {
  public type = ActionTypes.GET_ALBUMS_WITH_PHOTOS_FAILURE;

  constructor(public payload?: any) {
  }
}

export class GetAlbumsAction implements Action {
  public type = ActionTypes.GET_ALBUMS;

  constructor(public payload: number) {
  }
}

export class GetAlbumsSuccessAction implements Action {
  public type = ActionTypes.GET_ALBUMS_SUCCESS;

  constructor(public payload: Album[]) {
  }
}

export class GetAlbumsFailureAction implements Action {
  public type = ActionTypes.GET_ALBUMS_FAILURE;

  constructor(public payload?: any) {
  }
}

export class UploadAction implements Action {
  public type = ActionTypes.UPLOAD;

  constructor(public payload: any[]) {
  }
}

export class UploadSuccessAction implements Action {
  public type = ActionTypes.UPLOAD_SUCCESS;

  constructor(public payload: number) {
  }
}

export class UploadFailureAction implements Action {
  public type = ActionTypes.UPLOAD_FAILURE;

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
  | SetSelectedPhotoAction
  | SetSelectedPhotoSuccessAction
  | SetSelectedPhotoFailureAction
  | UnsetSelectedPhotoAction
  | UnsetSelectedPhotoSuccessAction
  | UnsetSelectedPhotoFailureAction
  | SwitchPhotoAction
  | SwitchPhotoSuccessAction
  | SwitchPhotoFailureAction
  | DeletePhotoAction
  | DeletePhotoSuccessAction
  | DeletePhotoFailureAction
  | SetAlbumPreviewAction
  | SetAlbumPreviewSuccessAction
  | SetAlbumPreviewFailureAction
  | GetCurrentAlbumAction
  | GetCurrentAlbumSuccessAction
  | GetCurrentAlbumFailureAction
  | DeleteAlbumAction
  | DeleteAlbumSuccessAction
  | DeleteAlbumFailureAction
  | GetAlbumsWithPhotosAction
  | GetAlbumsWithPhotosSuccessAction
  | GetAlbumsWithPhotosFailureAction
  | GetAlbumsAction
  | GetAlbumsSuccessAction
  | GetAlbumsFailureAction
  | UploadAction
  | UploadSuccessAction
  | UploadFailureAction

