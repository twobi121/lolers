import {UsersState} from './users.state';
import {MediaState} from './media.state';
import {DialoguesState} from './dialogues.state';
import {NotificationsState} from './notifications.state';
import {SocketState} from './socket.state';

export interface State {
  users: UsersState;
  media: MediaState;
  dialogues: DialoguesState;
  notification: NotificationsState;
  socket: SocketState;
}

