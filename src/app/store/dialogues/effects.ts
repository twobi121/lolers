import {Injectable} from '@angular/core';
import {Service} from './service';
import {Effect, Actions, ofType} from '@ngrx/effects';
import {
  ActionTypes,
  GetDialoguesAction,
  GetDialoguesFailureAction,
  GetDialoguesSuccessAction,
  GetMessagesAction,
  GetMessagesFailureAction,
  GetMessagesSuccessAction,

} from './actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {LastPhoto} from '../../interfaces/lastPhoto';
import {of} from 'rxjs';
import {Album} from '../../interfaces/album';
import {AlbumsPhotos} from '../../interfaces/albumsPhotos';
import {Dialogue} from '../../interfaces/dialogue';
import {Message} from '../../interfaces/message';

@Injectable()
export class Effects {
  constructor(
    private actions$: Actions,
    private service: Service,
  ) {
  }

  @Effect()
  getDialogues$ = this.actions$.pipe(
    ofType<GetDialoguesAction>(ActionTypes.GET_DIALOGUES),
    switchMap(() => this.service.getDialogues()),
    map((dialogues: Dialogue[]) => new GetDialoguesSuccessAction(dialogues)),
    catchError((err) => of(new GetDialoguesFailureAction()))
  );

  @Effect()
  getMessages$ = this.actions$.pipe(
    ofType<GetMessagesAction>(ActionTypes.GET_MESSAGES),
    switchMap((action: GetMessagesAction) => this.service.getMessages(action.payload)),
    map((messages: Message[]) => new GetMessagesSuccessAction(messages)),
    catchError((err) => of(new GetMessagesFailureAction()))
  );


}
