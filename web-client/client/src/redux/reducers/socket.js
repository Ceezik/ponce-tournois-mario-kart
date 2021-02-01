import { SET_SOCKET } from '../types/socket';

const initialState = {
    socket: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_SOCKET:
            return { socket: action.payload };
        default:
            return state;
    }
}
