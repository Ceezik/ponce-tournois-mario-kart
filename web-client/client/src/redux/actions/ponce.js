import { getPonce } from '../../services/ponce';
import { SET_PONCE, SET_LOADING } from '../types/ponce';

export const fetchPonce = () => (dispatch) => {
    getPonce()
        .then((res) => dispatch({ type: SET_PONCE, payload: res.data }))
        .catch(() => {})
        .finally(() => dispatch({ type: SET_LOADING, payload: false }));
};
