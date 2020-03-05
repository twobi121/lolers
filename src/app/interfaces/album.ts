import {Photo} from './photo';

export interface Album {
  _id: number;
  main: boolean;
  name: string;
  date: Date;
  description: string;
  owner_id: number;
  preview: string;
  photos?: Photo[];
}
