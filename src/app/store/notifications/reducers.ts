import {Actions as actions, ActionTypes} from './actions';
import {NotificationsState, initialState} from '../states/notifications.state';

export function reducer(state: NotificationsState = initialState, action: actions): NotificationsState {
  switch (action.type) {
    case ActionTypes.SET_MESSAGE_NOTIFICATION: {
      return {
        ...state,
        message: action.payload
      };
    }
    case ActionTypes.SET_FRIENDSHIP_NOTIFICATION: {
      return {
        ...state,
        friendship: action.payload
      };
    }
    case ActionTypes.SET_LIKE_NOTIFICATION: {
      return {
        ...state,
        like: action.payload
      };
    }
    default:
      return state;
  }
}
