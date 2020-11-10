import {
    SET_PONCE_PARTICIPATIONS,
    SET_USER_PARTICIPATIONS,
} from '../types/participations';

export const setPonceParticipations = (participations) => (dispatch) => {
    dispatch({ type: SET_PONCE_PARTICIPATIONS, payload: participations });
};

export const setUserParticipations = (participations) => (dispatch) => {
    dispatch({ type: SET_USER_PARTICIPATIONS, payload: participations });
};
