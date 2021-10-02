import {
    SET_COMPARISONS,
    SET_LOADING,
    ON_GET_PARTICIPATIONS,
} from '../types/useComparisons';

export const onGetParticipations = (participations) => (dispatch) => {
    dispatch({ type: ON_GET_PARTICIPATIONS, payload: participations });
};

export const setComparisons = (comparisons) => (dispatch) => {
    dispatch({ type: SET_COMPARISONS, payload: comparisons });
};

export const setLoading = (loading) => (dispatch) => {
    dispatch({ type: SET_LOADING, payload: loading });
};
