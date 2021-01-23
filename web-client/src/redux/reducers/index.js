import { combineReducers } from 'redux';
import tracks from './tracks';
import auth from './auth';
import socket from './socket';
import tournaments from './tournaments';
import statistics from './statistics';

export default combineReducers({
    tracks,
    auth,
    socket,
    tournaments,
    statistics,
});
