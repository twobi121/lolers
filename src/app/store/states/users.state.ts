import {User} from '../../interfaces/user';
import {IsFriend} from '../../interfaces/isFriend';
import {Request} from '../../interfaces/request';
import {Friend} from '../../interfaces/friend';

export interface UsersState {
  users: User[];
  user: User;
  loggedUser: User;
  isAuth: boolean;
  isFriend: IsFriend;
  requestStatus: boolean;
  requests: Request[];
  friends: Friend[];
  loginError: string;
  regState: boolean;
}

export const initialState: UsersState = {
  users: [],
  user: null,
  loggedUser: null,
  isAuth: !!localStorage.getItem('authUserToken'),
  isFriend: null,
  requestStatus: false,
  requests: [],
  friends: [],
  loginError: '',
  regState: false,
};

