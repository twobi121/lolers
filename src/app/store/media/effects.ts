import {Injectable} from '@angular/core';
import {Service} from './service';
import {Effect, Actions, ofType} from '@ngrx/effects';
import {
  ActionTypes,
  DeleteAlbumAction,
  DeleteAlbumFailureAction,
  DeleteAlbumSuccessAction,
  DeletePhotoAction,
  DeletePhotoFailureAction,
  DeletePhotoSuccessAction,
  GetAlbumsAction, GetAlbumsFailureAction,
  GetAlbumsSuccessAction,
  GetAlbumsWithPhotosAction,
  GetAlbumsWithPhotosFailureAction,
  GetAlbumsWithPhotosSuccessAction,
  GetCurrentAlbumAction,
  GetCurrentAlbumFailureAction,
  GetCurrentAlbumSuccessAction,
  GetLastPhotosAction,
  GetLastPhotosFailureAction,
  GetLastPhotosSuccessAction,
  SetAlbumPreviewAction,
  SetAlbumPreviewFailureAction,
  SetAlbumPreviewSuccessAction, SetLikeAction, SetLikeFailureAction, SetLikeSuccessAction,
  SwitchPhotoAction,
  SwitchPhotoFailureAction,
  SwitchPhotoSuccessAction, UploadAction, UploadFailureAction, UploadSuccessAction,
} from './actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {LastPhoto} from '../../interfaces/lastPhoto';
import {of} from 'rxjs';
import {HttpRequest, HttpResponse} from '@angular/common/http';
import {Album} from '../../interfaces/album';
import {AlbumsPhotos} from '../../interfaces/albumsPhotos';

@Injectable()
export class Effects {
  constructor(
    private actions$: Actions,
    private service: Service,
  ) {
  }

  @Effect()
  getLastPhotos$ = this.actions$.pipe(
    ofType<GetLastPhotosAction>(ActionTypes.GET_LAST_PHOTOS),
    switchMap((action: GetLastPhotosAction) => this.service.getLastPhotos(action.payload)),
    map((lastPhotos: LastPhoto[]) => new GetLastPhotosSuccessAction(lastPhotos)),
    catchError((err) => of(new GetLastPhotosFailureAction()))
  );

  @Effect()
  deletePhoto$ = this.actions$.pipe(
    ofType<DeletePhotoAction>(ActionTypes.DELETE_PHOTO),
    switchMap((action: DeletePhotoAction) => this.service.deletePhoto(action.payload)),
    map(() => new DeletePhotoSuccessAction()),
    catchError((err) => of(new DeletePhotoFailureAction()))
  );

  @Effect()
  albumPreview$ = this.actions$.pipe(
    ofType<SetAlbumPreviewAction>(ActionTypes.SET_ALBUM_PREVIEW),
    switchMap((action: SetAlbumPreviewAction) => this.service.setAlbumPreview(action.payload)),
    map(() => new SetAlbumPreviewSuccessAction()),
    catchError((err) => of(new SetAlbumPreviewFailureAction()))
  );

  @Effect()
  currentAlbum$ = this.actions$.pipe(
    ofType<GetCurrentAlbumAction>(ActionTypes.GET_CURRENT_ALBUM),
    switchMap((action: GetCurrentAlbumAction) => this.service.getCurrentAlbum(action.payload)),
    map((album: Album) => new GetCurrentAlbumSuccessAction(album)),
    catchError((err) => of(new GetCurrentAlbumFailureAction()))
  );

  @Effect()
  deleteAlbum$ = this.actions$.pipe(
    ofType<DeleteAlbumAction>(ActionTypes.DELETE_ALBUM),
    switchMap((action: DeleteAlbumAction) => this.service.deleteAlbum(action.payload)),
    map(() => new DeleteAlbumSuccessAction()),
    catchError((err) => of(new DeleteAlbumFailureAction()))
  );

  @Effect()
  getAlbumsWithPhotos$ = this.actions$.pipe(
    ofType<GetAlbumsWithPhotosAction>(ActionTypes.GET_ALBUMS_WITH_PHOTOS),
    switchMap((action: GetAlbumsWithPhotosAction) => this.service.getAlbumsWithPhotos(action.payload)),
    map((albums: AlbumsPhotos) => new GetAlbumsWithPhotosSuccessAction(albums)),
    catchError((err) => of(new GetAlbumsWithPhotosFailureAction()))
  );

  @Effect()
  getAlbums$ = this.actions$.pipe(
    ofType<GetAlbumsAction>(ActionTypes.GET_ALBUMS),
    switchMap((action: GetAlbumsAction) => this.service.getAlbums(action.payload)),
    map((albums: Album[]) => new GetAlbumsSuccessAction(albums)),
    catchError((err) => of(new GetAlbumsFailureAction()))
  );

  @Effect()
  upload$ = this.actions$.pipe(
    ofType<UploadAction>(ActionTypes.UPLOAD),
    switchMap((action: UploadAction) => this.service.uploadArray(action.payload)),
    switchMap((idx: number) => of(new UploadSuccessAction(idx))),
    catchError((err) => of(new UploadFailureAction(err)))
  );

  @Effect()
  setLike$ = this.actions$.pipe(
    ofType<SetLikeAction>(ActionTypes.SET_LIKE),
    switchMap((action: SetLikeAction) => this.service.setLike(action.payload)),
    map((data: any) => new SetLikeSuccessAction(data)),
    catchError((err) => of(new SetLikeFailureAction(err)))
  );

}
