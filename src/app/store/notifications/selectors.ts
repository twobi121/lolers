import {createSelector} from '@ngrx/store';
import {State} from '../states/app.state';
import {NotificationsState} from '../states/notifications.state';


const notifications = (state: State) => state.notification;

export const selectNotifications = createSelector(
  notifications,
  (state: NotificationsState) => state ? state.notification : ''
);

