import {createSelector} from '@ngrx/store';
import {State} from '../states/app.state';
import {SocketState} from '../states/socket.state';

const selectSocket = (state: State) => state.socket;

export const selectIsConnected = createSelector(
  selectSocket,
  (state: SocketState) => state ? state.connected : false
);

