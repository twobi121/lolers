import {Injectable} from '@angular/core';
import {Service} from './service';
import {Effect, Actions, ofType} from '@ngrx/effects';
import {
  ActionTypes,
  GetLastPhotosAction,
  GetLastPhotosFailureAction,
  GetLastPhotosSuccessAction,
  SwitchPhotoAction,
  SwitchPhotoFailureAction,
  SwitchPhotoSuccessAction,
} from './actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {LastPhoto} from '../../interfaces/lastPhoto';
import {of} from 'rxjs';

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
  switchPhoto$ = this.actions$.pipe(
    ofType<SwitchPhotoAction>(ActionTypes.SWITCH_PHOTO),
    map((action: SwitchPhotoAction) => new SwitchPhotoSuccessAction(action.payload)),
    catchError((err) => of(new SwitchPhotoFailureAction()))
  );




}
