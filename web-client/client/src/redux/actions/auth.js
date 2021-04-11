import Cookies from 'js-cookie';
import { getProfil, signup as _signup } from '../../services/auth';
import { SET_USER, SET_LOADING } from '../types/auth';

export const fetchUser = () => (dispatch) => {
    getProfil()
        .then((res) => dispatch({ type: SET_USER, payload: res.data }))
        .catch(() => {})
        .finally(() => dispatch({ type: SET_LOADING, payload: false }));
};

export const updateUser = (user) => (dispatch) => {
    dispatch({ type: SET_USER, payload: user });
};

export const signup = (user, setError, setLoading, onSignup) => (dispatch) => {
    setLoading(true);
    _signup(user)
        .then((res) => {
            dispatch({ type: SET_USER, payload: res.data.user });
            Cookies.set('token', res.data.token, { expires: 365 });
            onSignup();
        })
        .catch((err) => {
            setError(err.response.data);
            setLoading(false);
        });
};

export const signin = (token, onSignin) => (dispatch) => {
    Cookies.set('token', token, { expires: 365 });
    getProfil()
        .then((res) => dispatch({ type: SET_USER, payload: res.data }))
        .finally(() => onSignin());
};

export const signout = (onSignout) => (dispatch) => {
    Cookies.remove('token');
    dispatch({ type: SET_USER, payload: null });
    onSignout();
};
