const TwitchStrategy = require('passport-twitch-new').Strategy,
    auth_ctrl = require('../controllers/auth_ctrl');

module.exports = new TwitchStrategy(
    {
        clientID: process.env.TWITCH_CLIENT_ID,
        clientSecret: process.env.TWITCH_CLIENT_SECRET,
        callbackURL: `${process.env.PASSPORT_CALLBACK}/auth/twitch/callback`,
        scope: 'user_read',
    },
    (accessToken, refreshToken, profile, done) => {
        auth_ctrl.passportStrategy(profile.id, profile.login, done);
    }
);
