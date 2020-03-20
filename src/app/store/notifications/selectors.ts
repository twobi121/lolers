import {createSelector} from '@ngrx/store';
import {State} from '../states/app.state';
import {NotificationsState} from '../states/notifications.state';


const notifications = (state: State) => state.notification;

export const selectMessagesNotification = createSelector(
  notifications,
  (state: NotificationsState) => state ? state.message : null );

export const selectFriendshipNotification = createSelector(
  notifications,
  (state: NotificationsState) => state ? state.friendship : null );


