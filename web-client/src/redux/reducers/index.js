import { combineReducers } from 'redux';
import tracks from './tracks';
import auth from './auth';
import socket from './socket';
import participations from './participations';

export default combineReducers({
    tracks,
    auth,
    socket,
    participations,
});
