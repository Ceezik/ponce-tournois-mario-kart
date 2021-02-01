import { SET_MAX_ITEMS } from '../types/statistics';

export const setMaxItems = (maxItems) => (dispatch) => {
    dispatch({
        type: SET_MAX_ITEMS,
        payload: maxItems,
    });
};
