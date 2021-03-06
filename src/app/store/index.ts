import * as fromUser from './users/reducers';
import * as fromMedia from './media/reducers';
import * as fromDialogues from './dialogues/reducers';
import * as fromNotifications from './notifications/reducers';
import * as fromSocket from './socket/reducers';
import {ActionReducerMap} from '@ngrx/store';
import {State} from './states/app.state';

export const reducers: ActionReducerMap<State> = {
  users: fromUser.reducer,
  media: fromMedia.reducer,
  dialogues: fromDialogues.reducer,
  notification: fromNotifications.reducer,
  socket: fromSocket.reducer,
};

