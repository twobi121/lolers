import {UsersState} from './users.state';
import {MediaState} from './media.state';

export interface State {
  users: UsersState;
  media: MediaState;
}

