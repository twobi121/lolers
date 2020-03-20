import {Message} from '../../interfaces/message';
import {User} from '../../interfaces/user';

export interface NotificationsState {
  message: Message;
  friendship: User;
}

export const initialState: NotificationsState = {
  message: null,
  friendship: null,
};

