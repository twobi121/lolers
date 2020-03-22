import {Injectable} from '@angular/core';
import {Service} from './service';
import {Effect, Actions, ofType} from '@ngrx/effects';
import {
  ActionTypes,
  SetConnectionAction,
  SendMessageAction,
  SendMessageFailureAction,
  SubscribeMessagesAction,
  SubscribeMessagesFailureAction,
  LeaveRoomAction,
  LeaveRoomFailureAction,
  JoinRoomAction,
  SubscribeNotificationsAction,
  SubscribeNotificationsSuccessAction,
  SubscribeNotificationsFailureAction,
  SetConnectionSuccessAction,
  DisconnectAction,
  DisconnectSuccessAction
} from './actions';
import {catchError, map, switchMap} from 'rxjs/operators';

import {of} from 'rxjs';
import {Message} from '../../interfaces/message';
import {
  AddMessageAction,
  SetLastMessageAction,
  SetMessagesAsReadAction,
  SetUnreadMessagesNumberAction,
  SetUserOnlineInChatAction
} from '../dialogues/actions';
import {
  SetFriendshipNotificationAction, SetLikeNotificationAction,
  SetMessageNotificationAction,
} from '../notifications/actions';
import {SetRequestNumberAction} from '../users/actions';

@Injectable()
export class Effects {
  constructor(
    private actions$: Actions,
    private service: Service,
  ) {
  }

  @Effect()
  setConnection$ = this.actions$.pipe(
    ofType<SetConnectionAction>(ActionTypes.SET_CONNECTION),
    map((action: SetConnectionAction) => this.service.setConnection(action.payload)),
    switchMap(() => of(new SetConnectionSuccessAction())),
    catchError((err) => of(console.log(err)))
  );

  @Effect()
  disconnect$ = this.actions$.pipe(
    ofType<DisconnectAction>(ActionTypes.DISCONNECT),
    map(() => this.service.disconnect()),
    switchMap(() => of(new DisconnectSuccessAction())),
    catchError((err) => of(console.log(err)))
  );

  @Effect({dispatch: false})
  joinRoom$ = this.actions$.pipe(
    ofType<JoinRoomAction>(ActionTypes.JOIN_ROOM),
    map((action: JoinRoomAction) => this.service.joinRoom(action.payload)),
    catchError((err) => of(console.log(err)))
  );

  @Effect({dispatch: false})
  leaveRoom$ = this.actions$.pipe(
    ofType<LeaveRoomAction>(ActionTypes.LEAVE_ROOM),
    map(() => this.service.leaveRoom()),
    catchError((err) => of(new LeaveRoomFailureAction()))
  );

  @Effect({dispatch: false})
  sendMessage$ = this.actions$.pipe(
    ofType<SendMessageAction>(ActionTypes.SEND_MESSAGE),
    map((action: SendMessageAction) => this.service.sendMessage(action.payload)),
    catchError((err) => of(new SendMessageFailureAction()))
  );

  @Effect()
  subscribeMessages$ = this.actions$.pipe(
    ofType<SubscribeMessagesAction>(ActionTypes.SUBSCRIBE_MESSAGES),
    switchMap(() => this.service.getMessages()),
    switchMap((message: Message) => of(new AddMessageAction(message))),
    catchError((err) => of(new SubscribeMessagesFailureAction()))
  );

  @Effect()
  subscribeNotifications$ = this.actions$.pipe(
    ofType<SubscribeNotificationsAction>(ActionTypes.SUBSCRIBE_NOTIFICATION),
    switchMap(() => this.service.getNotifications()),
    switchMap((notification: any) => {
        switch (notification.event) {
          case 'read': {
            return of(new SetMessagesAsReadAction(notification.payload));
          }
          case 'new-message': {
            return [
              new SetMessageNotificationAction(notification.message),
              new SetLastMessageAction(notification.message),
              new SetUnreadMessagesNumberAction()
            ];
          }
          case 'friendship': {
            return [new SetFriendshipNotificationAction(notification.friend),
              new SetRequestNumberAction()
            ];
          }
          case 'online': {
            return of(new SetUserOnlineInChatAction(notification));
          }
          case 'offline': {
            return of(new SetUserOnlineInChatAction(notification));
          }
          case 'like': {
            return of(new SetLikeNotificationAction(notification));
          }
          default: {
            return of(new SubscribeNotificationsSuccessAction(notification.payload));
          }
        }
    }),
    catchError((err) => of(new SubscribeNotificationsFailureAction()))
  );

}
