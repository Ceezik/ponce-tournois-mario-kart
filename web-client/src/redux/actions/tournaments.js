import { SET_TOURNAMENTS_STATE } from '../types/tournaments';

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
