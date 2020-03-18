import {Message} from '../../interfaces/message';

export interface NotificationsState {
  notification: string;
  message: Message;
}

export const initialState: NotificationsState = {
  notification: '',
  message: null,
};

