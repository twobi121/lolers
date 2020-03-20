import {Dialogue} from '../../interfaces/dialogue';
import {Message} from '../../interfaces/message';

export interface DialoguesState {
  dialogues: Dialogue[];
  messages: Message[];
  activeDialogue: Dialogue;
  dialogueId: Dialogue;
  unreadMessagesNumber: number;
}

export const initialState: DialoguesState = {
  dialogues: [],
  messages: [],
  activeDialogue: null,
  dialogueId: null,
  unreadMessagesNumber: 0,
};
