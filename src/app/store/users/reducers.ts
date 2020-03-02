import {Actions as actions, ActionTypes} from './actions';
import {UsersState, initialState} from '../states/users.state';
import {User} from '../../interfaces/user';
import {IsFriend} from '../../interfaces/isFriend';
import {Request} from '../../interfaces/request';

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
        loggedUser: {} as User,
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
    case ActionTypes.GET_REQUESTS:
      return {
        ...state,
        requests: [] as Request[]
      };
    case ActionTypes.GET_REQUESTS_SUCCESS:
      return {
        ...state,
        requests: action.payload
      };
    case ActionTypes.GET_REQUESTS_FAILURE:
      return {
        ...state,
        requests: [] as Request[]
      };
    case ActionTypes.ACCEPT_REQUEST:
      return state;
    case ActionTypes.ACCEPT_REQUEST_SUCCESS: {
      const idx = state.requests.findIndex((item: Request) => item._id === action.payload);
      state.requests[idx].accepted = true;
      return state;
    }
    case ActionTypes.ACCEPT_REQUEST_FAILURE:
      return {
        ...state,
        requests: []
      };
    case ActionTypes.DECLINE_REQUEST:
      return state;
    case ActionTypes.DECLINE_REQUEST_SUCCESS: {
      const idx = state.requests.findIndex((item: Request) => item._id === action.payload);
      state.requests[idx].accepted = false;
      return state;
    }
    case ActionTypes.DECLINE_REQUEST_FAILURE:
      return {
        ...state,
        requests: []
      };
    case ActionTypes.UPLOAD_AVATAR_SUCCESS:
      return {
        ...state,
        user: {...state.user, avatar: action.payload}
      };
    default:
      return state;
  }
}
