import {Injectable} from '@angular/core';
import {Service} from './service';
import {Effect, Actions, ofType} from '@ngrx/effects';
import {
  ActionTypes,
  UploadAvatarAction, UploadAvatarSuccessAction, UploadAvatarFailureAction
} from './actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {HttpResponse} from '@angular/common/http';



@Injectable()
export class Effects {
  constructor(
    private actions$: Actions,
    private service: Service,
  ) {
  }

  @Effect()
  uploadAvatar$ = this.actions$.pipe(
    ofType<UploadAvatarAction>(ActionTypes.UPLOAD_AVATAR),
    switchMap((action: UploadAvatarAction) => this.service.uploadAvatar(action.payload)),
    map((response: HttpResponse<object>) => new UploadAvatarSuccessAction(response.body)),
    catchError((err) => of(new UploadAvatarFailureAction()))
  );


}
