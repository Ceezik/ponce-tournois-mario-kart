const passport = require('passport'),
    auth_ctrl = require('../controllers/auth_ctrl');

module.exports = [
    {
        url: '/auth/twitch',
        method: 'get',
        func: passport.authenticate('twitch'),
    },

    {
        url: '/auth/twitch/callback',
        method: 'get',
        func: [
            passport.authenticate('twitch', { session: false }),
            auth_ctrl.passportCallback,
        ],
    },

    {
        url: '/signup',
        method: 'post',
        func: auth_ctrl.signup,
    },
];
