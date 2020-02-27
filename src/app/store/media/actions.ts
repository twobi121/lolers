import {Action} from '@ngrx/store';
import {User} from '../../interfaces/user';

export const ActionTypes = {
  UPLOAD_AVATAR: 'Upload Avatar',
  UPLOAD_AVATAR_SUCCESS: 'Upload Avatar Success',
  UPLOAD_AVATAR_FAILURE: 'Upload Avatar Failure',
  // GET_USER: 'Get User',
  // GET_USER_SUCCESS: 'Get User Success',
  // GET_USER_FAILURE: 'Get User Failure',
  // GET_LOGGED_USER: 'Get Logged User',
  // GET_LOGGED_USER_SUCCESS: 'Get Logged User Success',
  // GET_LOGGED_USER_FAILURE: 'Get Logged User Failure',
  // LOGOUT: 'Logout',
  // LOGOUT_SUCCESS: 'Logout Success',
  // LOGOUT_FAILURE: 'Logout Failure',
  // IS_FRIEND: 'Is Friend',
  // IS_FRIEND_SUCCESS: 'Is Friend Success',
  // IS_FRIEND_FAILURE: 'Is Friend Failure',
  // SEND_REQUEST: 'Send Request',
  // SEND_REQUEST_SUCCESS: 'Send Request Success',
  // SEND_REQUEST_FAILURE: 'Send Request Failure'
};

export class UploadAvatarAction implements Action {
  public type = ActionTypes.UPLOAD_AVATAR;

  constructor(public payload?: any) {
  }
}

export class UploadAvatarSuccessAction implements Action {
  public type = ActionTypes.UPLOAD_AVATAR_SUCCESS;

  constructor(public payload: any) {
  }
}

export class UploadAvatarFailureAction implements Action {
  public type = ActionTypes.UPLOAD_AVATAR_FAILURE;

  constructor(public payload?: any) {
  }
}




export type Actions =
  UploadAvatarAction
  | UploadAvatarSuccessAction
  | UploadAvatarFailureAction;
