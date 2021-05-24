import { SET_LOADING, SET_PONCE } from '../types/ponce';

const intitialState = {
    ponce: null,
    loading: true,
};

export default function (state = intitialState, action) {
    switch (action.type) {
        case SET_PONCE:
            return { ...state, ponce: action.payload };
        case SET_LOADING:
            return { ...state, loading: action.payload };
        default:
            return state;
    }
}
