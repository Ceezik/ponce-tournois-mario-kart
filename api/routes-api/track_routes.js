const track_ctrl = require('../controllers/track_ctrl');
const auth_ctrl = require('../controllers/auth_ctrl');

module.exports = [
    {
        url: '/tracks',
        method: 'get',
        func: track_ctrl.getAll,
    },

    {
        url: '/cups/:cupId/tracks',
        method: 'post',
        func: [auth_ctrl.isAuthenticated, auth_ctrl.isAdmin, track_ctrl.create],
    },
];
