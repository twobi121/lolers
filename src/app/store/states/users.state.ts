import {User} from '../../interfaces/user';
import {IsFriend} from '../../interfaces/isFriend';

export interface UsersState {
  users: User[];
  user: User;
  loggedUser: User;
  isAuth: boolean;
  isFriend: IsFriend;
  requestStatus: boolean;
}

export const initialState: UsersState = {
  users: [],
  user: null,
  loggedUser: null,
  isAuth: !!localStorage.getItem('authUserToken'),
  isFriend: null,
  requestStatus: false,
};

