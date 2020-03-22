import {Action} from '@ngrx/store';
import {Message} from '../../interfaces/message';

export const ActionTypes = {

  SET_CONNECTION: 'Set Connection',
  SET_CONNECTION_SUCCESS: 'Set Connection Success',
  SET_CONNECTION_FAILURE: 'Set Connection Failure',
  DISCONNECT: 'Disconnect',
  DISCONNECT_SUCCESS: 'Disconnect Success',
  DISCONNECT_FAILURE: 'Disconnect Failure',
  SEND_MESSAGE: 'Send Message',
  SEND_MESSAGE_FAILURE: 'Send Message Failure',
  SUBSCRIBE_MESSAGES: 'Subscribe Messages',
  SUBSCRIBE_MESSAGES_FAILURE: 'Subscribe Messages Failure',
  JOIN_ROOM: 'Join Room',
  JOIN_ROOM_FAILURE: 'Join Room Failure',
  LEAVE_ROOM: 'Leave Room',
  LEAVE_ROOM_FAILURE: 'Leave Room Failure',
  SUBSCRIBE_NOTIFICATION: 'Subscribe Notification',
  SUBSCRIBE_NOTIFICATION_SUCCESS: 'Subscribe Notification Success',
  SUBSCRIBE_NOTIFICATION_FAILURE: 'Subscribe Notification Failure',
};

export class SetConnectionAction implements Action {
  public type = ActionTypes.SET_CONNECTION;

  constructor(public payload?: any) {
  }
}

export class SetConnectionSuccessAction implements Action {
  public type = ActionTypes.SET_CONNECTION_SUCCESS;

  constructor(public payload?: any) {
  }
}

export class SetConnectionFailureAction implements Action {
  public type = ActionTypes.SET_CONNECTION_FAILURE;

  constructor(public payload?: any) {
  }
}

export class DisconnectAction implements Action {
  public type = ActionTypes.DISCONNECT;

  constructor(public payload?: any) {
  }
}

export class DisconnectSuccessAction implements Action {
  public type = ActionTypes.DISCONNECT_SUCCESS;

  constructor(public payload?: any) {
  }
}

export class DisconnectFailureAction implements Action {
  public type = ActionTypes.DISCONNECT_FAILURE;

  constructor(public payload?: any) {
  }
}



export class SendMessageAction implements Action {
  public type = ActionTypes.SEND_MESSAGE;

  constructor(public payload: Message) {
  }
}

export class SendMessageFailureAction implements Action {
  public type = ActionTypes.SEND_MESSAGE_FAILURE;

  constructor(public payload?: any) {
  }
}

export class SubscribeMessagesAction implements Action {
  public type = ActionTypes.SUBSCRIBE_MESSAGES;

  constructor(public payload?: any) {
  }
}

export class SubscribeMessagesFailureAction implements Action {
  public type = ActionTypes.SUBSCRIBE_MESSAGES_FAILURE;

  constructor(public payload?: any) {
  }
}

export class JoinRoomAction implements Action {
  public type = ActionTypes.JOIN_ROOM;

  constructor(public payload: string) {
  }
}

export class JoinRoomFailureAction implements Action {
  public type = ActionTypes.JOIN_ROOM_FAILURE;

  constructor(public payload?: any) {
  }
}

export class LeaveRoomAction implements Action {
  public type = ActionTypes.LEAVE_ROOM;

  constructor(public payload?: any) {
  }
}

export class LeaveRoomFailureAction implements Action {
  public type = ActionTypes.LEAVE_ROOM_FAILURE;

  constructor(public payload?: any) {
  }
}

export class SubscribeNotificationsAction implements Action {
  public type = ActionTypes.SUBSCRIBE_NOTIFICATION;

  constructor(public payload?: any) {
  }
}

export class SubscribeNotificationsSuccessAction implements Action {
  public type = ActionTypes.SUBSCRIBE_NOTIFICATION_SUCCESS;

  constructor(public payload?: any) {
  }
}

export class SubscribeNotificationsFailureAction implements Action {
  public type = ActionTypes.SUBSCRIBE_NOTIFICATION_FAILURE;

  constructor(public payload?: any) {
  }
}

export type Actions =
  | SetConnectionAction
  | SetConnectionSuccessAction
  | SetConnectionFailureAction
  | DisconnectAction
  | DisconnectSuccessAction
  | DisconnectFailureAction
  | SendMessageAction
  | SendMessageFailureAction
  | SubscribeMessagesAction
  | SubscribeMessagesFailureAction
  | JoinRoomAction
  | JoinRoomFailureAction
  | LeaveRoomFailureAction
  | LeaveRoomAction
  | SubscribeNotificationsAction
  | SubscribeNotificationsSuccessAction
  | SubscribeNotificationsFailureAction



