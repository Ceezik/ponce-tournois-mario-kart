import { createSelector } from 'reselect';
import _ from 'lodash';

export const getReversedTournaments = createSelector(
    (state) => state.tournaments,
    ({ tournaments }) => [...tournaments].reverse()
);

export const getTournamentById = createSelector(
    (state) => state.tournaments,
    (_, id) => +id,
    ({ tournaments }, id) => _.find(tournaments, { id })
);
