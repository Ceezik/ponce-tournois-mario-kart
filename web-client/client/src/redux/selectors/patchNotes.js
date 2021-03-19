import { createSelector } from 'reselect';

export const getPatchNoteById = createSelector(
    (state) => state.patchNotes,
    (_, id) => +id,
    ({ patchNotes }, id) => _.find(patchNotes, { id })
);
