import {Actions as actions, ActionTypes} from './actions';
import {NotificationsState, initialState} from '../states/notifications';

export function reducer(state: NotificationsState = initialState, action: actions): NotificationsState {
  switch (action.type) {
    case ActionTypes.SET_NOTIFICATIONS: {
      return {
        ...state,
        notification: action.payload
      };
    }
    default:
      return state;
  }
}
