import {Actions as actions, ActionTypes} from './actions';
import {NotificationsState, initialState} from '../states/notifications.state';

export function reducer(state: NotificationsState = initialState, action: actions): NotificationsState {
  switch (action.type) {

    case ActionTypes.SET_NOTIFICATIONS_SUCCESS: {
      return {
        ...state,
        message: action.payload.message
      };
    }
    default:
      return state;
  }
}
