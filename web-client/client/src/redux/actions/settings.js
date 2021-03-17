import { SET_THEME } from '../types/settings';

const getTheme = () => {
    let theme = localStorage.getItem('theme');
    if (theme) return theme;
    return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
};

export const fetchTheme = () => (dispatch) => {
    dispatch({ type: SET_THEME, payload: getTheme() });
};

export const switchTheme = (theme) => (dispatch) => {
    dispatch({ type: SET_THEME, payload: theme });
};
