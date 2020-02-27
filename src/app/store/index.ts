import * as fromUser from './users/reducers';
import * as fromMedia from './media/reducers'
import {ActionReducerMap} from '@ngrx/store';
import {State} from './states/app.state';

export const reducers: ActionReducerMap<State> = {
  users: fromUser.reducer,
  media: fromMedia.reducer
};
