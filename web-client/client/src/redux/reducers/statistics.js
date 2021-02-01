import { SET_MAX_ITEMS } from '../types/statistics';

const initialState = {
    maxItems: 25,
    itemsPerPage: [10, 25, 50, 100],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_MAX_ITEMS:
            return { ...state, maxItems: action.payload };
        default:
            return state;
    }
}
