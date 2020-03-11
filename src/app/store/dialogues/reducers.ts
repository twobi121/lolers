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
    case ActionTypes.SET_DIALOGUE: {
      state.dialogues.forEach(item => item.active = false);
      const idx = state.dialogues.findIndex(item => item._id === action.payload);
      state.dialogues[idx].active = true;
      return {
        ...state,
        activeDialogue: state.dialogues[idx]
      };
    }
    case ActionTypes.GET_MESSAGES_SUCCESS: {
      return {
        ...state,
        messages: action.payload
      };
    }
    case ActionTypes.ADD_MESSAGE: {
      state.activeDialogue.lastMessage =  action.payload;
      return {
        ...state,
        messages: state.messages.concat(action.payload)
      };
    }
    default:
      return state;
  }
}
