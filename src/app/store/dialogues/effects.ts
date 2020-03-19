import {Injectable} from '@angular/core';
import {Service} from './service';
import {Service as SocketService} from '../socket/service';
import {Effect, Actions, ofType} from '@ngrx/effects';
import {
  ActionTypes,
  GetDialogueIdAction,
  GetDialogueIdFailureAction,
  GetDialogueIdSuccessAction,
  GetDialoguesAction,
  GetDialoguesFailureAction,
  GetDialoguesSuccessAction,
  GetPreviousMessagesAction,
  GetPreviousMessagesSuccessAction,
  SetReadMessageOnJoinAction,
  StartDialogueAction, StartDialogueFailureAction,
  StartDialogueSuccessAction,
  SubscribeGetMessagesAction,
  SubscribeGetMessagesFailureAction,
  SubscribeGetMessagesSuccessAction

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
    switchMap((action: GetDialoguesAction) => this.service.getDialogues(action.payload)),
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

  @Effect()
  getPreviousMessages$ = this.actions$.pipe(
    ofType<GetPreviousMessagesAction>(ActionTypes.GET_PREVIOUS_MESSAGES),
    switchMap((action: GetPreviousMessagesAction) => this.socketService.getPreviousMessages(action.payload)),
    map((messages: Message[]) => new GetPreviousMessagesSuccessAction(messages)),
    catchError((err) => of(new SubscribeGetMessagesFailureAction()))
  );

  @Effect({dispatch: false})
  setReadMessagesOnJoin$ = this.actions$.pipe(
    ofType<SetReadMessageOnJoinAction>(ActionTypes.SET_READ_MESSAGES_ON_JOIN),
    map((action: SetReadMessageOnJoinAction) => this.socketService.setRead(action.payload)),
    catchError((err) => of(new SubscribeGetMessagesFailureAction()))
  );

  @Effect()
  getDialogueId$ = this.actions$.pipe(
    ofType<GetDialogueIdAction>(ActionTypes.GET_DIALOGUE_ID),
    switchMap((action: GetDialogueIdAction) => this.service.getDialogueId(action.payload)),
    map((dialogue: Dialogue) => new GetDialogueIdSuccessAction(dialogue)),
    catchError((err) => of(new GetDialogueIdFailureAction()))
  );

  @Effect()
  startDialogue$ = this.actions$.pipe(
    ofType<StartDialogueAction>(ActionTypes.START_DIALOGUE),
    switchMap((action: StartDialogueAction) => this.service.startDialogue(action.payload)),
    map((dialogue: Dialogue) => new GetDialogueIdSuccessAction(dialogue)),
    catchError((err) => of(new StartDialogueFailureAction()))
  );

}
