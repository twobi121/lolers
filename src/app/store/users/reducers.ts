import {Actions as actions, ActionTypes} from './actions';
import {UsersState, initialState} from '../states/users.state';
import {User} from '../../interfaces/user';
import {IsFriend} from '../../interfaces/isFriend';

export function reducer(state: UsersState = initialState, action: actions): UsersState {
  switch (action.type) {
    case ActionTypes.GET_USERS:
      return {
        ...state,
        users: []
      };
    case ActionTypes.GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload
      };
    case ActionTypes.GET_USERS_FAILURE:
      return {
        ...state,
        users: []
      };
    case ActionTypes.GET_USER:
      return {
        ...state,
        user: null,
      };
    case ActionTypes.GET_USER_SUCCESS:
      return {
        ...state,
        user: action.payload
      };
    case ActionTypes.GET_USER_FAILURE:
      return {
        ...state,
        user: {} as User
      };
    case ActionTypes.GET_LOGGED_USER:
      return {
        ...state,
        loggedUser: null
      };
    case ActionTypes.GET_LOGGED_USER_SUCCESS:
      return {
        ...state,
        isAuth: true,
        loggedUser: action.payload
      };
    case ActionTypes.GET_LOGGED_USER_FAILURE:
      return {
        ...state,
        loggedUser: {} as User
      };
    case ActionTypes.LOGOUT:
      return {
        ...state,
        loggedUser: {} as User
      };
    case ActionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        isAuth: false,
        loggedUser: {} as User
      };
    case ActionTypes.LOGOUT_FAILURE:
      return {
        ...state,
        loggedUser: {} as User
      };
    case ActionTypes.IS_FRIEND:
      return {
        ...state,
        isFriend: {} as IsFriend
      };
    case ActionTypes.IS_FRIEND_SUCCESS:
      return {
        ...state,
        isFriend: action.payload
      };
    case ActionTypes.IS_FRIEND_FAILURE:
      return {
        ...state,
        isFriend: {} as IsFriend
      };
    case ActionTypes.SEND_REQUEST:
      return state;
    case ActionTypes.SEND_REQUEST_SUCCESS:
      return {
        ...state,
        requestStatus: action.payload
      };
    case ActionTypes.SEND_REQUEST_FAILURE:
      return {
        ...state,
        requestStatus: false
      };
    default:
      return state;
  }
}
