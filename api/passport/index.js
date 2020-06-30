const passport = require('passport'),
    db = require('../models');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    db.User.findByPk(id)
        .then((user) => {
            done(null, user);
        })
        .catch((err) => done(err));
});

passport.use(require('./twitch_strategy'));
