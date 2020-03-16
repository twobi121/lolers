import {Action} from '@ngrx/store';
import {Dialogue} from '../../interfaces/dialogue';
import {Message} from '../../interfaces/message';

export const ActionTypes = {

  GET_DIALOGUES: 'Get Dialogues',
  GET_DIALOGUES_SUCCESS: 'Get Dialogues Success',
  GET_DIALOGUES_FAILURE: 'Get Dialogues Failure',
  GET_MESSAGES: 'Get Messages',
  GET_MESSAGES_SUCCESS: 'Get Messages Success',
  GET_MESSAGES_FAILURE: 'Get Messages Failure',
  ADD_MESSAGE: 'Add Message',
  ADD_MESSAGE_SUCCESS: 'Add Message Success',
  ADD_MESSAGE_FAILURE: 'Add Message Failure',
  SET_DIALOGUE: 'Set Dialogue',
  SET_DIALOGUE_SUCCESS: 'Set Dialogue Success',
  SET_DIALOGUE_FAILURE: 'Set Dialogue Failure',
  SET_READ_MESSAGES: 'Set Read Messages',
  GET_PREVIOUS_MESSAGES: 'Get Previous Messages',
  GET_PREVIOUS_MESSAGES_SUCCESS: 'Get Previous Messages Success',
  GET_PREVIOUS_MESSAGES_FAILURE: 'Get Previous Messages Failure',
  SET_READ_MESSAGES_ON_JOIN: 'Set Read Messages On Join',
  GET_DIALOGUE_ID: 'Get Dialogue Id',
  GET_DIALOGUE_ID_SUCCESS: 'Get Dialogue Id Success',
  GET_DIALOGUE_ID_FAILURE: 'Get Dialogue Id Failure',
  START_DIALOGUE: 'Start Dialogue',
  START_DIALOGUE_SUCCESS: 'Start Dialogue Success',
  START_DIALOGUE_FAILURE: 'Start Dialogue FAILURE',
};

export class GetDialoguesAction implements Action {
  public type = ActionTypes.GET_DIALOGUES;

  constructor(public payload?: any) {
  }
}

export class GetDialoguesSuccessAction implements Action {
  public type = ActionTypes.GET_DIALOGUES_SUCCESS;

  constructor(public payload: Dialogue[]) {
  }
}

export class GetDialoguesFailureAction implements Action {
  public type = ActionTypes.GET_DIALOGUES_FAILURE;

  constructor(public payload?: any) {
  }
}

export class SubscribeGetMessagesAction implements Action {
  public type = ActionTypes.GET_MESSAGES;

  constructor(public payload?: any) {
  }
}

export class SubscribeGetMessagesSuccessAction implements Action {
  public type = ActionTypes.GET_MESSAGES_SUCCESS;

  constructor(public payload: Message[]) {
  }
}

export class SubscribeGetMessagesFailureAction implements Action {
  public type = ActionTypes.GET_MESSAGES_FAILURE;

  constructor(public payload?: any) {
  }
}

export class AddMessageAction implements Action {
  public type = ActionTypes.ADD_MESSAGE;

  constructor(public payload: Message) {
  }
}

export class SetDialogueAction implements Action {
  public type = ActionTypes.SET_DIALOGUE;

  constructor(public payload: string) {
  }
}

export class SetMessagesAsReadAction implements Action {
  public type = ActionTypes.SET_READ_MESSAGES;

  constructor(public payload: number) {
  }
}



export class GetPreviousMessagesAction implements Action {
  public type = ActionTypes.GET_PREVIOUS_MESSAGES;

  constructor(public payload: number) {
  }
}

export class GetPreviousMessagesSuccessAction implements Action {
  public type = ActionTypes.GET_PREVIOUS_MESSAGES_SUCCESS;

  constructor(public payload: Message[]) {
  }
}

export class GetPreviousMessagesFailureAction implements Action {
  public type = ActionTypes.GET_PREVIOUS_MESSAGES_FAILURE;

  constructor(public payload?: any) {
  }
}

export class SetReadMessageOnJoinAction implements Action {
  public type = ActionTypes.SET_READ_MESSAGES_ON_JOIN;

  constructor(public payload: number) {
  }
}

export class GetDialogueIdAction implements Action {
  public type = ActionTypes.GET_DIALOGUE_ID;

  constructor(public payload: number) {
  }
}

export class GetDialogueIdSuccessAction implements Action {
  public type = ActionTypes.GET_DIALOGUE_ID_SUCCESS;

  constructor(public payload: number) {
  }
}

export class GetDialogueIdFailureAction implements Action {
  public type = ActionTypes.GET_DIALOGUE_ID_FAILURE;

  constructor(public payload?: any) {
  }
}

export class StartDialogueAction implements Action {
  public type = ActionTypes.START_DIALOGUE;

  constructor(public payload: number) {
  }
}

export class StartDialogueSuccessAction implements Action {
  public type = ActionTypes.START_DIALOGUE_SUCCESS;

  constructor(public payload?: any) {
  }
}


export class StartDialogueFailureAction implements Action {
  public type = ActionTypes.START_DIALOGUE_FAILURE;

  constructor(public payload?: any) {
  }
}


export type Actions =
  GetDialoguesAction
  | GetDialoguesSuccessAction
  | GetDialoguesFailureAction
  | SubscribeGetMessagesAction
  | SubscribeGetMessagesSuccessAction
  | SubscribeGetMessagesFailureAction
  | AddMessageAction
  | SetDialogueAction
  | SetMessagesAsReadAction
  | GetPreviousMessagesAction
  | GetPreviousMessagesSuccessAction
  | GetPreviousMessagesFailureAction
  | SetReadMessageOnJoinAction
  | GetDialogueIdAction
  | GetDialogueIdSuccessAction
  | GetDialogueIdFailureAction
  | StartDialogueAction
| StartDialogueSuccessAction
|StartDialogueFailureAction



