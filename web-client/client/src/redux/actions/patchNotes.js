import { getLatest } from '../../services/patchNotes';
import { SET_LATEST_PATCH_NOTE } from '../types/patchNotes';

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
