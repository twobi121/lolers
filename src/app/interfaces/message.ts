import {User} from './user';

export interface Message {
  _id?: number;
  date?: Date;
  message: string;
  owner_id: number;
  receivers_id: User[] | number[];
  readUsers?: number[];
  chat_id: number;
  owner?: User;
}
