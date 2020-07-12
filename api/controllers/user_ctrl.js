const db = require('../models');

module.exports = {
    getCurrent: (req, res, next) => {
        return res.json(req.user);
    },

    update: (req, res, next) => {
        const { username } = req.body;

        if (username) {
            return db.User.usernameIsUnique(username)
                .then((isUnique) => {
                    if (isUnique) {
                        return req.user
                            .update({ username })
                            .then((user) => res.json(user))
                            .catch((err) => next(err));
                    }
                    throw {
                        status: 409,
                        message: "Ce nom d'utilisateur est déjà utilisé",
                    };
                })
                .catch((err) => next(err));
        }
        throw { status: 406, message: 'Paramètres invalides' };
    },
};
