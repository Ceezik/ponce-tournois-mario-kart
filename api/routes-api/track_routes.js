const track_ctrl = require('../controllers/track_ctrl');
const auth_ctrl = require('../controllers/auth_ctrl');

module.exports = [
    {
        url: '/cups/:cupId/tracks',
        method: 'get',
        func: track_ctrl.getByCup,
    },

    {
        url: '/cups/:cupId/tracks',
        method: 'post',
        func: [auth_ctrl.isAuthenticated, auth_ctrl.isAdmin, track_ctrl.create],
    },
];
