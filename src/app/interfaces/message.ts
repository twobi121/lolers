import {User} from './user';

export interface Message {
  _id?: number;
  date?: Date;
  message: string;
  owner_id: User | number;
  chat_id: number;
}
