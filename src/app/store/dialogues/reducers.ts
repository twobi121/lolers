import {Actions as actions, ActionTypes} from './actions';
import {DialoguesState, initialState} from '../states/dialogues.state';


export function reducer(state: DialoguesState = initialState, action: actions): DialoguesState {
  switch (action.type) {
    case ActionTypes.GET_DIALOGUES_FAILURE: {
      return {
        ...state,
        activeDialogue: null,
        dialogues: []
      };
    }
    case ActionTypes.GET_DIALOGUES_SUCCESS: {
      return {
        ...state,
        dialogueId: null,
        dialogues: state.dialogues.concat(action.payload)
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
      const idx = state.dialogues.findIndex(item => item._id === action.payload[0].chat_id);
      state.dialogues[idx].unreadMsgNumber = 0;
      return {
        ...state,
        messages: action.payload
      };
    }
    case ActionTypes.GET_MESSAGES_FAILURE: {
      return {
        ...state,
        messages: []
      };
    }
    case ActionTypes.ADD_MESSAGE: {
      const idx = state.dialogues.findIndex(dialogue => dialogue._id === action.payload[0].chat_id);
      state.dialogues[idx].lastMessage = action.payload[0];
      const dialoguesArr = state.dialogues.slice(idx, idx + 1).concat(state.dialogues.slice(0, idx).concat(state.dialogues.slice(idx + 1, state.dialogues.length)));
      return {
        ...state,
        dialogues: dialoguesArr,
        messages: state.messages.concat(action.payload)
      };
    }
    case ActionTypes.SET_READ_MESSAGES: {
      return {
        ...state,
        messages: state.messages.filter(message => {
          if (message.readUsers.length) {
            message.readUsers = [];
          }
          return message;
        })
      };
    }
    case ActionTypes.GET_PREVIOUS_MESSAGES_SUCCESS: {
      if (action.payload) {
        return {
          ...state,
          messages: action.payload.concat(state.messages)
        };
      }
      return state;
    }
    // case ActionTypes.GET_DIALOGUE_ID_SUCCESS: {
    //   if (!action.payload) {
    //     return state;
    //   }
    //   const idx = state.dialogues.findIndex(item => item._id === action.payload._id);
    //   if (idx !== -1) {
    //     state.dialogues.forEach(item => item.active = false);
    //     state.dialogues[idx].active = true;
    //     return {
    //       ...state,
    //       dialogueId: action.payload._id,
    //       activeDialogue: state.dialogues[idx]
    //     };
    //   }
    //   action.payload.active = true;
    //   return {
    //     ...state,
    //     dialogues: [action.payload].concat(state.dialogues),
    //     dialogueId: action.payload._id,
    //     activeDialogue: action.payload
    //   };
    // }
    case ActionTypes.GET_DIALOGUE_ID_SUCCESS: {
      return {
        ...state,
        dialogueId: action.payload
      };
    }
    case ActionTypes.START_DIALOGUE_SUCCESS: {
      const idx = state.dialogues.findIndex(dialogue => dialogue._id === action.payload._id);
      if (idx === -1) {
        action.payload.active = true;
        return {
          ...state,
          dialogues: [action.payload].concat(state.dialogues),
          dialogueId: action.payload,
          activeDialogue: action.payload
        };
      } else {
        state.dialogues.forEach(item => item.active = false);
        state.dialogues[idx].active = true;
        return {
          ...state,
          dialogueId: action.payload,
          activeDialogue: action.payload
        };
      }
    }
    case ActionTypes.SET_LAST_MESSAGE: {
      if (!state.dialogues.length) {
        return state;
      }
      const idx = state.dialogues.findIndex(dialogue => dialogue._id === action.payload.chat_id);
      state.dialogues[idx].lastMessage = action.payload;
      ++state.dialogues[idx].unreadMsgNumber;
      const dialoguesArr = state.dialogues.slice(idx, idx + 1).concat(state.dialogues.slice(0, idx).concat(state.dialogues.slice(idx + 1, state.dialogues.length)));
      return {
        ...state,
        dialogues: dialoguesArr,
      };
    }
    case ActionTypes.CLEAR_DIALOGUES_STATE: {
      return {
        ...initialState,
        unreadMessagesNumber: state.unreadMessagesNumber
      };
    }
    case ActionTypes.SET_UNREAD_MESSAGES_NUMBER_SUCCESS: {
      return {
        ...state,
        unreadMessagesNumber: action.payload
      };
    }
    default:
      return state;
  }
}
