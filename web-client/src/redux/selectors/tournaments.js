import { createSelector } from 'reselect';

export const getReversedTournaments = createSelector(
    (state) => state.tournaments,
    ({ tournaments }) => [...tournaments].reverse()
);
