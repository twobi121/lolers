import {Message} from '../../interfaces/message';
import {User} from '../../interfaces/user';
import {Like} from '../../interfaces/like';

export interface NotificationsState {
  message: Message;
  friendship: User;
  like: Like;
}

export const initialState: NotificationsState = {
  message: null,
  friendship: null,
  like: null,
};

