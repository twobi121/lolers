import {UsersState} from './users.state';
import {MediaState} from './media.state';
import {DialoguesState} from './dialogues.state';

export interface State {
  users: UsersState;
  media: MediaState;
  dialogues: DialoguesState;
}

