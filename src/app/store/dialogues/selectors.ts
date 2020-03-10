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

export const selectActiveDialogue = createSelector(
  selectDialogues,
  (state: DialoguesState) => state ? state.activeDialogue : null
);

export const selectDialogueMembers = createSelector(
  selectDialogues,
  (state: DialoguesState) => state ? state.activeDialogue.users : null
);
