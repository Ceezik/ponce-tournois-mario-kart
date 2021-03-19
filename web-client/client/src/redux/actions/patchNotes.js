import { getAll, getLatest } from '../../services/patchNotes';
import {
    ADD_PATCH_NOTE,
    EDIT_PATCH_NOTE,
    SET_LATEST_PATCH_NOTE,
    SET_PATCH_NOTES_STATE,
} from '../types/patchNotes';

export const fetchLatestPatchNote = () => (dispatch) => {
    getLatest()
        .then((res) => {
            dispatch({
                type: SET_LATEST_PATCH_NOTE,
                payload: res.data,
            });
        })
        .catch(() => {});
};

export const fetchPatchNotes = () => (dispatch) => {
    getAll()
        .then((res) =>
            dispatch({
                type: SET_PATCH_NOTES_STATE,
                payload: { patchNotes: res.data, loading: false, error: null },
            })
        )
        .catch((err) =>
            dispatch({
                type: SET_PATCH_NOTES_STATE,
                payload: { loading: false, error: err.response.message },
            })
        );
};

export const addPatchNote = (patchNote) => (dispatch) => {
    dispatch({
        type: ADD_PATCH_NOTE,
        payload: patchNote,
    });
};

export const editPatchNote = (patchNote) => (dispatch) => {
    dispatch({
        type: EDIT_PATCH_NOTE,
        payload: patchNote,
    });
};
