import { getAll } from '../../services/tracks';
import { ADD_TRACK, SET_TRACKS } from '../types/tracks';

export const fetchTracks = () => (dispatch) => {
    getAll()
        .then((res) => dispatch({ type: SET_TRACKS, payload: res.data }))
        .catch(() =>
            dispatch({
                type: SET_TRACKS,
                payload: 'Impossible de récupérer les circuits',
            })
        );
};

export const addTrack = (track) => (dispatch) => {
    dispatch({ type: ADD_TRACK, payload: track });
};
