const db = require('../models'),
    { Op } = require('sequelize'),
    { paginate } = require('../utils');

module.exports = {
    getAll: (req, res, next) => {
        return db.User.findAndCountAll({
            where: {
                username: { [Op.substring]: `${req.query.username}` },
                id: { [Op.notIn]: req.query.excluded || [] },
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

    getPonce: (req, res, next) => {
        return db.User.findOne({
            where: { twitchId: process.env.PONCE_TWITCH_ID },
            attributes: ['id'],
        })
            .then((ponce) => res.json(ponce))
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

    getCurrent: async (req, res, next) => {
        return db.User.findByPk(req.user.id, {
            include: [
                {
                    model: db.User,
                    as: 'Editors',
                    attributes: ['id', 'username'],
                },
                {
                    model: db.User,
                    as: 'Managers',
                    attributes: ['id', 'username'],
                },
            ],
        })
            .then((user) => res.json(user))
            .catch((err) => next(err));
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

    addEditor: (req, res, next) => {
        const { username } = req.body;

        if (username) {
            return db.User.findOne({
                where: { username },
                attributes: ['id', 'username'],
            })
                .then((user) => {
                    if (user) {
                        return req.user
                            .addEditor(user)
                            .then(() => res.json(user))
                            .catch((err) => next(err));
                    }
                    throw {
                        status: 404,
                        message: "Cet utilisateur n'existe pas",
                    };
                })
                .catch((err) => next(err));
        }
        throw { status: 406, message: 'Paramètres invalides' };
    },

    removeEditor: (req, res, next) => {
        return req.user
            .removeEditor(req.params.editorId)
            .then((nbRemoved) => {
                if (nbRemoved) return res.status(204).send();
                throw {
                    status: 404,
                    message:
                        'Cet utilisateur ne fait pas partie de vos éditeurs',
                };
            })
            .catch((err) => next(err));
    },
};
