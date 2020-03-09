import {Actions as actions, ActionTypes} from './actions';
import {DialoguesState, initialState} from '../states/dialogues.state';


export function reducer(state: DialoguesState = initialState, action: actions): DialoguesState {
  switch (action.type) {
    case ActionTypes.GET_DIALOGUES_SUCCESS: {
      return {
        ...state,
        dialogues: action.payload
      };
    }
    case ActionTypes.GET_MESSAGES_SUCCESS: {
      return {
        ...state,
        messages: action.payload
      };
    }
    default:
      return state;
  }
}
