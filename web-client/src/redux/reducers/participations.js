import {
    SET_PONCE_PARTICIPATIONS,
    SET_USER_PARTICIPATIONS,
} from '../types/participations';

const initialState = {
    ponce: { participations: [], loading: true, error: null },
    user: { participations: [], loading: true, error: null },
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_PONCE_PARTICIPATIONS:
            return { ...state, ponce: { ...state.ponce, ...action.payload } };
        case SET_USER_PARTICIPATIONS:
            return { ...state, user: { ...state.user, ...action.payload } };
        default:
            return state;
    }
}
