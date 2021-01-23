import _ from 'lodash';
import {
    SET_TOURNAMENTS_STATE,
    ADD_TOURNAMENT,
    EDIT_TOURNAMENT,
} from '../types/tournaments';

const initialState = {
    tournaments: [],
    loading: true,
    error: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_TOURNAMENTS_STATE:
            return { ...state, ...action.payload };
        case ADD_TOURNAMENT:
            return {
                ...state,
                tournaments: _.orderBy(
                    [...state.tournaments, action.payload],
                    ['startDate'],
                    ['desc']
                ),
            };
        case EDIT_TOURNAMENT:
            return {
                ...state,
                tournaments: _.orderBy(
                    state.tournaments.map((tournament) =>
                        tournament.id === action.payload.id
                            ? { ...tournament, ...action.payload }
                            : tournament
                    ),
                    ['startDate'],
                    ['desc']
                ),
            };
        default:
            return state;
    }
}
