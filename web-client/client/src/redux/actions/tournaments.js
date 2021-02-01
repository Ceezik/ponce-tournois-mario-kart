import {
    SET_TOURNAMENTS_STATE,
    ADD_TOURNAMENT,
    EDIT_TOURNAMENT,
} from '../types/tournaments';

export const setTournaments = (tournaments) => (dispatch) => {
    dispatch({
        type: SET_TOURNAMENTS_STATE,
        payload: { tournaments, loading: false, error: null },
    });
};

export const setTournamentsError = (error) => (dispatch) => {
    dispatch({
        type: SET_TOURNAMENTS_STATE,
        payload: { loading: false, error },
    });
};

export const addTournament = (tournament) => (dispatch) => {
    dispatch({
        type: ADD_TOURNAMENT,
        payload: tournament,
    });
};

export const editTournament = (tournament) => (dispatch) => {
    dispatch({
        type: EDIT_TOURNAMENT,
        payload: tournament,
    });
};
