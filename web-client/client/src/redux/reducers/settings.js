import { setChartStyle } from '../../utils/style';
import { SET_THEME } from '../types/settings';

const intitialState = {
    theme: 'light',
};

export default function (state = intitialState, action) {
    switch (action.type) {
        case SET_THEME:
            if (action.payload === 'dark')
                document.body.setAttribute('data-theme', 'dark');
            else document.body.removeAttribute('data-theme');
            localStorage.setItem('theme', action.payload);

            setChartStyle(action.payload);

            return { ...state, theme: action.payload };
        default:
            return state;
    }
}
