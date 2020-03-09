import {Action} from '@ngrx/store';
import {Dialogue} from '../../interfaces/dialogue';
import {Message} from '../../interfaces/message';

export const ActionTypes = {

  GET_DIALOGUES: 'Get Dialogues',
  GET_DIALOGUES_SUCCESS: 'Get Dialogues Success',
  GET_DIALOGUES_FAILURE: 'Get Dialogues Failure',
  GET_MESSAGES: 'Get Messages',
  GET_MESSAGES_SUCCESS: 'Get Messages Success',
  GET_MESSAGES_FAILURE: 'Get Messages Failure'

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

export class GetMessagesAction implements Action {
  public type = ActionTypes.GET_MESSAGES;

  constructor(public payload: number) {
  }
}

export class GetMessagesSuccessAction implements Action {
  public type = ActionTypes.GET_MESSAGES_SUCCESS;

  constructor(public payload: Message[]) {
  }
}

export class GetMessagesFailureAction implements Action {
  public type = ActionTypes.GET_MESSAGES_FAILURE;

  constructor(public payload?: any) {
  }
}

export type Actions =
  GetDialoguesAction
  | GetDialoguesSuccessAction
  | GetDialoguesFailureAction
  | GetMessagesAction
  | GetMessagesSuccessAction
  | GetMessagesFailureAction


