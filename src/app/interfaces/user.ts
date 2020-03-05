import {Avatar} from './avatar';

export interface User {
  _id?: number;
  avatar: Avatar;
  login: string;
  name: string;
  surname: string;
  phone: number;
  birth_year: number;
  email: string;
  deleteStatus?: boolean;
}
