import {Dialogue} from '../../interfaces/dialogue';
import {Message} from '../../interfaces/message';

export interface DialoguesState {
  dialogues: Dialogue[];
  messages: Message[];
}

export const initialState: DialoguesState = {
  dialogues: [],
  messages: []
};
