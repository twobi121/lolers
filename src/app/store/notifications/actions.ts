import {Action} from '@ngrx/store';
import {Dialogue} from '../../interfaces/dialogue';
import {Message} from '../../interfaces/message';
import {Friend} from '../../interfaces/friend';


export const ActionTypes = {

  SET_NOTIFICATIONS: 'Set Notifications',
  SET_NOTIFICATIONS_SUCCESS: 'Set Notifications Success',
  SET_NOTIFICATIONS_FAILURE: 'Set Notifications Failure',
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



export type Actions =
  SetNotificationsAction
  | SetNotificationsSuccessAction
  | SetNotificationFailureAction




