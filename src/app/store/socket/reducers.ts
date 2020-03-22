import {Actions as actions, ActionTypes} from './actions';
import {SocketState, initialState} from '../states/socket.state';

export function reducer(state: SocketState = initialState, action: actions): SocketState {
  switch (action.type) {
    case ActionTypes.SET_CONNECTION_SUCCESS: {
      return {
        ...state,
        connected: true
      };
    }
    case ActionTypes.DISCONNECT_SUCCESS: {
      return {
        ...state,
        connected: false
      };
    }
    default:
      return state;
  }
}
