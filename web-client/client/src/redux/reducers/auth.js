import { SET_LOADING, SET_USER } from '../types/auth';

const intitialState = {
    user: null,
    loading: true,
};

export default function (state = intitialState, action) {
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.payload };
        case SET_LOADING:
            return { ...state, loading: action.payload };
        default:
            return state;
    }
}
