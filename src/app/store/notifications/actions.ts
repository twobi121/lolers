import {Action} from '@ngrx/store';
import {Dialogue} from '../../interfaces/dialogue';
import {Message} from '../../interfaces/message';
import {Friend} from '../../interfaces/friend';


export const ActionTypes = {

  SET_NOTIFICATIONS: 'Set Notifications',
  SET_NOTIFICATIONS_SUCCESS: 'Set Notifications Success',
  SET_NOTIFICATIONS_FAILURE: 'Set Notifications Failure',
  SET_MESSAGE_NOTIFICATION: 'Set Message Notification',
  SET_FRIENDSHIP_NOTIFICATION: 'Set Friendship Notification',
};

export class SetNotificationsAction implements Action {
  public type = ActionTypes.SET_NOTIFICATIONS;

  constructor(public payload: Message | Friend | number ) {
  }
}

export class SetNotificationsSuccessAction implements Action {
  public type = ActionTypes.SET_NOTIFICATIONS_SUCCESS;

  constructor(public payload?: any) {
  }
}

export class SetNotificationFailureAction implements Action {
  public type = ActionTypes.SET_NOTIFICATIONS_FAILURE;

  constructor(public payload?: any) {
  }
}

export class SetMessageNotificationAction implements Action {
  public type = ActionTypes.SET_MESSAGE_NOTIFICATION;

  constructor(public payload: Message) {
  }
}

export class SetFriendshipNotificationAction implements Action {
  public type = ActionTypes.SET_FRIENDSHIP_NOTIFICATION;

  constructor(public payload: Message) {
  }
}






export type Actions =
  SetNotificationsAction
  | SetNotificationsSuccessAction
  | SetNotificationFailureAction
  | SetMessageNotificationAction
  | SetFriendshipNotificationAction






