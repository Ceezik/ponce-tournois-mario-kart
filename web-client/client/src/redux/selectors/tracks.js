import { createSelector } from 'reselect';
import _ from 'lodash';

export const getSortedTracks = createSelector(
    (state) => state.tracks,
    ({ tracks }) => _.sortBy(tracks, (t) => t.name.toLowerCase())
);
