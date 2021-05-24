import { combineReducers } from 'redux';
import tracks from './tracks';
import auth from './auth';
import socket from './socket';
import tournaments from './tournaments';
import statistics from './statistics';
import patchNotes from './patchNotes';
import settings from './settings';
import ponce from './ponce';

export default combineReducers({
    tracks,
    auth,
    socket,
    tournaments,
    statistics,
    patchNotes,
    settings,
    ponce,
});
