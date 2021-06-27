const db = require('../models'),
    jwt = require('jsonwebtoken'),
    expressjwt = require('express-jwt'),
    moment = require('moment'),
    { SECRET } = process.env;

module.exports = {
    passportStrategy: (twitchId, username, done) => {
        return db.User.findOne({ where: { twitchId } })
            .then((u) => {
                if (u) done(null, u);
                else {
                    return db.SignupToken.findOrCreate({ where: { twitchId } })
                        .then(([token]) =>
                            done(null, {
                                token,
                                twitchId,
                                username,
                                signupNeeded: true,
                            })
                        )
                        .catch((err) => done(err));
                }
            })
            .catch((err) => done(err));
    },

    passportCallback: (req, res) => {
        if (req.user.signupNeeded) {
            return res
                .status(200)
                .redirect(
                    `${process.env.WEB_CLIENT_URL}/signup?defaultUsername=${req.user.username}&twitchId=${req.user.twitchId}&token=${req.user.token.id}`
                );
        }

        const token = jwt.sign({ id: req.user.id }, SECRET, {
            expiresIn: '365d',
        });

        return res
            .status(200)
            .redirect(`${process.env.WEB_CLIENT_URL}/signin?token=${token}`);
    },

    signup: (req, res, next) => {
        const { username, twitchId, token } = req.body;

        if (username && twitchId && token) {
            return db.SignupToken.findByPk(token)
                .then((t) => {
                    if (t && t.twitchId === twitchId) {
                        return db.User.usernameIsUnique(username)
                            .then((isUnique) => {
                                if (isUnique) {
                                    return db.User.create({
                                        username,
                                        twitchId,
                                    })
                                        .then((user) => {
                                            t.destroy();
                                            const token = jwt.sign(
                                                { id: user.id },
                                                SECRET,
                                                {
                                                    expiresIn: '365d',
                                                }
                                            );
                                            return res.json({
                                                user: {
                                                    ...user.toJSON(),
                                                    Editors: [],
                                                    Managers: [],
                                                },
                                                token,
                                            });
                                        })
                                        .catch((err) => next(err));
                                }
                                throw {
                                    status: 409,
                                    message:
                                        "Ce nom d'utilisateur est déjà utilisé",
                                };
                            })
                            .catch((err) => next(err));
                    }
                    throw { status: 400, message: "L'inscription a échoué" };
                })
                .catch((err) => next(err));
        }
        throw { status: 400, message: "L'inscription a échoué" };
    },

    isAuthenticated: [
        expressjwt({ secret: SECRET, algorithms: ['HS256'] }),
        (req, res, next) => {
            db.User.findByPk(req.user.id)
                .then((user) => {
                    if (!user) {
                        throw {
                            status: 404,
                            message: "Cet utilisateur n'existe pas",
                        };
                    }
                    req.user = user;
                    return next();
                })
                .catch((err) => next(err));
        },
    ],

    isAdmin: (req, res, next) => {
        if (req.user.isAdmin) {
            return next();
        }
        throw {
            status: 403,
            message: "Vous n'êtes pas autorisé à effectuer cette action",
        };
    },
};
