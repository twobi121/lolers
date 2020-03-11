import {UsersState} from './users.state';
import {MediaState} from './media.state';
import {DialoguesState} from './dialogues.state';
import {NotificationsState} from './notifications';

export interface State {
  users: UsersState;
  media: MediaState;
  dialogues: DialoguesState;
  notification: NotificationsState;
}

