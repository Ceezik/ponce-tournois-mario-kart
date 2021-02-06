import { SET_LATEST_PATCH_NOTE } from '../types/patchNotes';

const intitialState = {
    latest: null,
};

export default function (state = intitialState, action) {
    switch (action.type) {
        case SET_LATEST_PATCH_NOTE:
            return { ...state, latest: action.payload };
        default:
            return state;
    }
}
