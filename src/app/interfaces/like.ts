import {User} from './user';
import {Photo} from './photo';

export interface Like {
  _id: number;
  sender: User;
  photo: Photo;
}
