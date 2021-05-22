import {
    ADD_EDITOR,
    REMOVE_EDITOR,
    SET_LOADING,
    SET_USER,
} from '../types/auth';

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
        case ADD_EDITOR:
            if (
                !state.user ||
                state.user.Editors.find((e) => e.id === action.payload.id)
            )
                return state;
            return {
                ...state,
                user: {
                    ...state.user,
                    Editors: [...state.user.Editors, action.payload],
                },
            };
        case REMOVE_EDITOR:
            if (!state.user) return state;
            return {
                ...state,
                user: {
                    ...state.user,
                    Editors: state.user.Editors.filter(
                        (e) => e.id !== action.payload
                    ),
                },
            };
        default:
            return state;
    }
}
