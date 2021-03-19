import {
    ADD_PATCH_NOTE,
    EDIT_PATCH_NOTE,
    SET_LATEST_PATCH_NOTE,
    SET_PATCH_NOTES_STATE,
} from '../types/patchNotes';

const intitialState = {
    latest: null,
    patchNotes: [],
    loading: true,
    error: null,
};

export default function (state = intitialState, action) {
    switch (action.type) {
        case SET_LATEST_PATCH_NOTE:
            return { ...state, latest: action.payload };
        case SET_PATCH_NOTES_STATE:
            return { ...state, ...action.payload };
        case ADD_PATCH_NOTE:
            return {
                ...state,
                patchNotes: [...state.patchNotes, action.payload],
            };
        case EDIT_PATCH_NOTE:
            return {
                ...state,
                patchNotes: state.patchNotes.map((patchNote) =>
                    patchNote.id === action.payload.id
                        ? { ...patchNote, ...action.payload }
                        : patchNote
                ),
            };
        default:
            return state;
    }
}
