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
  SET_READ_MESSAGES: 'Set Read Messages'
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



