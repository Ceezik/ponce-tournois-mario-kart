import { combineReducers } from 'redux';
import tracks from './tracks';
import auth from './auth';
import socket from './socket';
import tournaments from './tournaments';

export default combineReducers({
    tracks,
    auth,
    socket,
    tournaments,
});
