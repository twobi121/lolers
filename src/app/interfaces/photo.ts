export interface Photo {
  _id: number;
  date: Date;
  filename: string;
  album_id: number;
  owner_id: number;
  likes: number;
}
