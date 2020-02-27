import {Action} from '@ngrx/store';
import {User} from '../../interfaces/user';

export const ActionTypes = {
  GET_USERS: 'Get Users',
  GET_USERS_SUCCESS: 'Get Users Success',
  GET_USERS_FAILURE: 'Get Users Failure',
  GET_USER: 'Get User',
  GET_USER_SUCCESS: 'Get User Success',
  GET_USER_FAILURE: 'Get User Failure',
  GET_LOGGED_USER: 'Get Logged User',
  GET_LOGGED_USER_SUCCESS: 'Get Logged User Success',
  GET_LOGGED_USER_FAILURE: 'Get Logged User Failure',
  LOGOUT: 'Logout',
  LOGOUT_SUCCESS: 'Logout Success',
  LOGOUT_FAILURE: 'Logout Failure',
  IS_FRIEND: 'Is Friend',
  IS_FRIEND_SUCCESS: 'Is Friend Success',
  IS_FRIEND_FAILURE: 'Is Friend Failure',
  SEND_REQUEST: 'Send Request',
  SEND_REQUEST_SUCCESS: 'Send Request Success',
  SEND_REQUEST_FAILURE: 'Send Request Failure'
};

export class GetUsersAction implements Action {
  public type = ActionTypes.GET_USERS;

  constructor(public payload?: any) {
  }
}

export class GetUsersSuccessAction implements Action {
  public type = ActionTypes.GET_USERS_SUCCESS;

  constructor(public payload: User[]) {
  }
}

export class GetUsersFailureAction implements Action {
  public type = ActionTypes.GET_USERS_FAILURE;

  constructor(public payload?: any) {
  }
}

export class GetUserAction implements Action {
  public type = ActionTypes.GET_USER;

  constructor(public payload?: string) {
  }
}

export class GetUserSuccessAction implements Action {
  public type = ActionTypes.GET_USER_SUCCESS;

  constructor(public payload: User) {
  }
}

export class GetUserFailureAction implements Action {
  public type = ActionTypes.GET_USER_FAILURE;

  constructor(public payload?: any) {
  }
}

export class GetLoggedUserAction implements Action {
  public type = ActionTypes.GET_LOGGED_USER;

  constructor(public payload?: any) {
  }
}

export class GetLoggedUserSuccessAction implements Action {
  public type = ActionTypes.GET_LOGGED_USER_SUCCESS;

  constructor(public payload: User) {
  }
}

export class GetLoggedUserFailureAction implements Action {
  public type = ActionTypes.GET_LOGGED_USER_FAILURE;

  constructor(public payload?: any) {
  }
}

export class LogoutAction implements Action {
  public type = ActionTypes.LOGOUT;

  constructor(public payload?: any) {
  }
}

export class LogoutSuccessAction implements Action {
  public type = ActionTypes.LOGOUT_SUCCESS;

  constructor(public payload?: any) {
  }
}

export class LogoutFailureAction implements Action {
  public type = ActionTypes.LOGOUT_FAILURE;

  constructor(public payload?: any) {
  }
}

export class IsFriendAction implements Action {
  public type = ActionTypes.IS_FRIEND;

  constructor(public payload?: any) {
  }
}

export class IsFriendSuccessAction implements Action {
  public type = ActionTypes.IS_FRIEND_SUCCESS;

  constructor(public payload?: any) {
  }
}

export class IsFriendFailureAction implements Action {
  public type = ActionTypes.IS_FRIEND_FAILURE;

  constructor(public payload?: any) {
  }
}

export class SendRequestAction implements Action {
  public type = ActionTypes.SEND_REQUEST;

  constructor(public payload?: any) {
  }
}

export class SendRequestSuccessAction implements Action {
  public type = ActionTypes.SEND_REQUEST_SUCCESS;

  constructor(public payload: boolean) {
  }
}

export class SendRequestFailureAction implements Action {
  public type = ActionTypes.SEND_REQUEST_FAILURE;

  constructor(public payload?: any) {
  }
}



export type Actions =
  GetUsersAction
  | GetUsersSuccessAction
  | GetUsersFailureAction
  | GetUserAction
  | GetUserSuccessAction
  | GetUserFailureAction
  | GetLoggedUserAction
  | GetLoggedUserSuccessAction
  | GetLoggedUserFailureAction
  | LogoutAction
  | LogoutSuccessAction
  | LogoutFailureAction
  | IsFriendAction
  | IsFriendSuccessAction
  | IsFriendFailureAction
  | SendRequestAction
  | SendRequestSuccessAction
  | SendRequestFailureAction
