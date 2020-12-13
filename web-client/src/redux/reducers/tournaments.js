import { SET_TOURNAMENTS_STATE } from '../types/tournaments';

const initialState = {
    tournaments: [],
    loading: true,
    error: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_TOURNAMENTS_STATE:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}
