import {Action} from '@ngrx/store';
import {User} from '../../interfaces/user';
import {Request} from '../../interfaces/request';
import {Friend} from '../../interfaces/friend';
import {LoginData} from '../../interfaces/loginData';

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
  SEND_REQUEST_FAILURE: 'Send Request Failure',
  GET_REQUESTS: 'Get Requests',
  GET_REQUESTS_SUCCESS: 'Get Requests Success',
  GET_REQUESTS_FAILURE: 'Get Requests Failure',
  ACCEPT_REQUEST: 'Accept Request',
  ACCEPT_REQUEST_SUCCESS: 'Accept Request Success',
  ACCEPT_REQUEST_FAILURE: 'Accept Request Failure',
  DECLINE_REQUEST: 'Decline Request',
  DECLINE_REQUEST_SUCCESS: 'Decline Request Success',
  DECLINE_REQUEST_FAILURE: 'Decline Request Failure',
  UPLOAD_AVATAR: 'Upload Avatar',
  UPLOAD_AVATAR_SUCCESS: 'Upload Avatar Success',
  UPLOAD_AVATAR_FAILURE: 'Upload Avatar Failure',
  GET_FRIENDS: 'Get Friends',
  GET_FRIENDS_SUCCESS: 'Get Friends Success',
  GET_FRIENDS_FAILURE: 'Get Friends Failure',
  DELETE_FRIEND: 'Delete Friend',
  DELETE_FRIEND_SUCCESS: 'Delete Friend Success',
  DELETE_FRIEND_FAILURE: 'Delete Friend Failure',
  LOGIN: 'Login',
  LOGIN_SUCCESS: 'Login Success',
  LOGIN_FAILURE: 'Login Failure',
  ADD_USER: 'Add User',
  ADD_USER_SUCCESS: 'Add User Success',
  ADD_USER_FAILURE: 'Add User Failure',
  SEARCH: 'Search',
  SEARCH_SUCCESS: 'Search Success',
  SEARCH_FAILURE: 'Search Failure',
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

export class GetRequestsAction implements Action {
  public type = ActionTypes.GET_REQUESTS;

  constructor(public payload?: any) {
  }
}

export class GetRequestsSuccessAction implements Action {
  public type = ActionTypes.GET_REQUESTS_SUCCESS;

  constructor(public payload: Request[]) {
  }
}

export class GetRequestsFailureAction implements Action {
  public type = ActionTypes.GET_REQUESTS_FAILURE;

  constructor(public payload?: any) {
  }
}

export class AcceptRequestAction implements Action {
  public type = ActionTypes.ACCEPT_REQUEST;

  constructor(public payload?: any) {
  }
}

export class AcceptRequestSuccessAction implements Action {
  public type = ActionTypes.ACCEPT_REQUEST_SUCCESS;

  constructor(public payload: string) {
  }
}

export class AcceptRequestFailureAction implements Action {
  public type = ActionTypes.ACCEPT_REQUEST_FAILURE;

  constructor(public payload?: any) {
  }
}

export class DeclineRequestAction implements Action {
  public type = ActionTypes.DECLINE_REQUEST;

  constructor(public payload?: any) {
  }
}

export class DeclineRequestSuccessAction implements Action {
  public type = ActionTypes.DECLINE_REQUEST_SUCCESS;

  constructor(public payload: string) {
  }
}

export class DeclineRequestFailureAction implements Action {
  public type = ActionTypes.DECLINE_REQUEST_FAILURE;

  constructor(public payload?: any) {
  }
}

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

export class GetFriendsAction implements Action {
  public type = ActionTypes.GET_FRIENDS;

  constructor(public payload: string) {
  }
}

export class GetFriendsSuccessAction implements Action {
  public type = ActionTypes.GET_FRIENDS_SUCCESS;

  constructor(public payload: Friend[]) {
  }
}

export class GetFriendsFailureAction implements Action {
  public type = ActionTypes.GET_FRIENDS_FAILURE;

  constructor(public payload?: any) {
  }
}

export class DeleteFriendAction implements Action {
  public type = ActionTypes.DELETE_FRIEND;

  constructor(public payload: number) {
  }
}

export class DeleteFriendSuccessAction implements Action {
  public type = ActionTypes.DELETE_FRIEND_SUCCESS;

  constructor(public payload?: any) {
  }
}

export class DeleteFriendFailureAction implements Action {
  public type = ActionTypes.DELETE_FRIEND_FAILURE;

  constructor(public payload?: any) {
  }
}

export class LoginAction implements Action {
  public type = ActionTypes.LOGIN;

  constructor(public payload: LoginData) {
  }
}

export class LoginSuccessAction implements Action {
  public type = ActionTypes.LOGIN_SUCCESS;

  constructor(public payload?: any) {
  }
}

export class LoginFailureAction implements Action {
  public type = ActionTypes.LOGIN_FAILURE;

  constructor(public payload?: any) {
  }
}

export class AddUserAction implements Action {
  public type = ActionTypes.ADD_USER;

  constructor(public payload: User) {
  }
}

export class AddUserSuccessAction implements Action {
  public type = ActionTypes.ADD_USER_SUCCESS;

  constructor(public payload?: any) {
  }
}

export class AddUserFailureAction implements Action {
  public type = ActionTypes.ADD_USER_FAILURE;

  constructor(public payload?: any) {
  }
}

export class SearchAction implements Action {
  public type = ActionTypes.SEARCH;

  constructor(public payload: string) {
  }
}

export class SearchSuccesAction implements Action {
  public type = ActionTypes.SEARCH_SUCCESS;

  constructor(public payload: User[]) {
  }
}

export class SearchFailureAction implements Action {
  public type = ActionTypes.SEARCH_FAILURE;

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
  | GetRequestsAction
  | GetRequestsSuccessAction
  | GetRequestsFailureAction
  | AcceptRequestAction
  | AcceptRequestSuccessAction
  | AcceptRequestFailureAction
  | DeclineRequestAction
  | DeclineRequestSuccessAction
  | DeclineRequestFailureAction
  | UploadAvatarAction
  | UploadAvatarSuccessAction
  | UploadAvatarFailureAction
  | GetFriendsAction
  | GetFriendsSuccessAction
  | GetFriendsFailureAction
  | DeleteFriendAction
  | DeleteFriendSuccessAction
  | DeleteFriendFailureAction
  | LoginAction
  | LoginSuccessAction
  | LoginFailureAction
  | AddUserAction
  | AddUserSuccessAction
  | AddUserFailureAction
  | SearchAction
  | SearchSuccesAction
  | SearchFailureAction
