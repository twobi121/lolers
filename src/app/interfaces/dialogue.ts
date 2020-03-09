import {User} from './user';
import {Message} from './message';

export interface Dialogue {
  _id: number;
  users: User[];
  lastMessage: Message;
}
