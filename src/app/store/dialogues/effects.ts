import {Injectable} from '@angular/core';
import {Service} from './service';
import {Service as SocketService} from '../socket/service';
import {Effect, Actions, ofType} from '@ngrx/effects';
import {
  ActionTypes,
  GetDialoguesAction,
  GetDialoguesFailureAction,
  GetDialoguesSuccessAction,
  SubscribeGetMessagesAction, SubscribeGetMessagesFailureAction, SubscribeGetMessagesSuccessAction

} from './actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Dialogue} from '../../interfaces/dialogue';
import {Message} from '../../interfaces/message';

@Injectable()
export class Effects {
  constructor(
    private actions$: Actions,
    private service: Service,
    private socketService: SocketService
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
    ofType<SubscribeGetMessagesAction>(ActionTypes.GET_MESSAGES),
    switchMap(() => this.socketService.getStartMessages()),
    map((messages: Message[]) => new SubscribeGetMessagesSuccessAction(messages)),
    catchError((err) => of(new SubscribeGetMessagesFailureAction()))
  );

}
