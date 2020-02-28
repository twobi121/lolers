import {User} from './user';

export interface Request {
  _id?: number;
  user: User;
  accepted?: boolean;
}

