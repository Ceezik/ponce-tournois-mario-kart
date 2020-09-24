import { SET_TRACKS, SET_ERROR, ADD_TRACK } from '../types/tracks';

const initialState = {
    tracks: [],
    loading: true,
    error: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_TRACKS:
            return { tracks: action.payload, loading: false, error: null };
        case SET_ERROR:
            return { tracks: [], loading: false, error: action.payload };
        case ADD_TRACK:
            return { ...state, tracks: [...state.tracks, action.payload] };
        default:
            return state;
    }
}
