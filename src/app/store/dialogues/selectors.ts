import {createSelector} from '@ngrx/store';
import {State} from '../states/app.state';
import {DialoguesState} from '../states/dialogues.state';

const selectDialogues = (state: State) => state.dialogues;

export const selectRooms = createSelector(
  selectDialogues,
  (state: DialoguesState) => state ? state.dialogues : []
);

export const selectMessages = createSelector(
  selectDialogues,
  (state: DialoguesState) => state ? state.messages : []
);


