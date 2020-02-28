import {createSelector} from '@ngrx/store';
import {State} from '../states/app.state';
import {UsersState} from '../states/users.state';

const selectUsers = (state: State) => state.users;

export const selectUsersList = createSelector(
  selectUsers,
  (state: UsersState) => state ? state.users : []
);

export const selectUser = createSelector(
  selectUsers,
  (state: UsersState) => state ? state.user : null
);

export const selectLoggedUser = createSelector(
  selectUsers,
  (state: UsersState) => state ? state.loggedUser : null
);

export const selectIsAuth = createSelector(
  selectUsers,
  (state: UsersState) => state ? state.isAuth : false
);

export const selectIsFriend = createSelector(
  selectUsers,
  (state: UsersState) => state ? state.isFriend : null
);

export const selectRequestStatus = createSelector(
  selectUsers,
  (state: UsersState) => state ? state.requestStatus : false
);

export const selectRequests = createSelector(
  selectUsers,
  (state: UsersState) => state ? state.requests : []
);
