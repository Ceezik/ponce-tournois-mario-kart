import {
    SET_STREAMERS,
    SET_STREAMERS_COMPARISONS,
    SET_LOADING_STREAMERS,
    SET_LOADING_COMPARISONS,
    ON_GET_PARTICIPATIONS,
} from '../types/useStreamersChart';

export const onGetParticipations = (participations) => (dispatch) => {
    dispatch({ type: ON_GET_PARTICIPATIONS, payload: participations });
};

export const setStreamers = (streamers) => (dispatch) => {
    dispatch({ type: SET_STREAMERS, payload: streamers });
};

export const setLoadingStreamers = (loading) => (dispatch) => {
    dispatch({ type: SET_LOADING_STREAMERS, payload: loading });
};

export const setStreamersComparisons = (comparisons) => (dispatch) => {
    dispatch({ type: SET_STREAMERS_COMPARISONS, payload: comparisons });
};

export const setLoadingComparisons = (loading) => (dispatch) => {
    dispatch({ type: SET_LOADING_COMPARISONS, payload: loading });
};
