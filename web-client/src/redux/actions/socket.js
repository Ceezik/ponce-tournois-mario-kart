import socketIo from 'socket.io-client';
import { SET_SOCKET } from '../types/socket';

export const setSocket = (user) => (dispatch) => {
    const url = user
        ? `${process.env.REACT_APP_API_URL}?userId=${user.id}&isAdmin=${user.isAdmin}`
        : process.env.REACT_APP_API_URL;
    dispatch({ type: SET_SOCKET, payload: socketIo(url) });
};
