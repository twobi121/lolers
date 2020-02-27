import {Actions as actions, ActionTypes} from './actions';
import {MediaState, initialState} from '../states/media.state';
import {UsersState, initialState} from '../states/users.state';
import {State} from '../states/app.state';

export function reducer(state: State = initialState, action: actions): MediaState {
  switch (action.type) {
    case ActionTypes.UPLOAD_AVATAR_SUCCESS:
      return {
        ...state,
        loggedUser: {...state.loggedUser, avatar: action.payload}
      };
      default:
      return state;
  }
}
