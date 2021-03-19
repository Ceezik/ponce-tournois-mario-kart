const db = require('../models'),
    { Op } = require('sequelize'),
    { paginate } = require('../utils');

module.exports = {
    getAll: (req, res, next) => {
        return db.User.findAndCountAll({
            where: {
                username: { [Op.substring]: `${req.query.username}` },
            },
            order: [
                ['isAdmin', 'DESC'],
                ['username', 'ASC'],
            ],
            ...paginate(parseInt(req.query.page), parseInt(req.query.pageSize)),
        })
            .then(({ count, rows }) => res.json({ count, users: rows }))
            .catch((err) => next(err));
    },

    getByUsername: (req, res, next) => {
        const { username } = req.params;

        return db.User.findOne({ where: { username } })
            .then((user) => {
                if (user) return res.json(user);
                throw {
                    status: 404,
                    message: "Cet utilisateur n'existe pas",
                };
            })
            .catch((err) => next(err));
    },

    updateById: (req, res, next) => {
        return db.User.findByPk(req.params.userId)
            .then((user) => {
                if (user) {
                    return user
                        .update(req.body)
                        .then(() => res.sendStatus(200))
                        .catch((err) => next(err));
                }
                throw {
                    status: 404,
                    message: "Cet utilisateur n'existe pas",
                };
            })
            .catch((err) => next(err));
    },

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
