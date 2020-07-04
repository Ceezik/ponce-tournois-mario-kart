const db = require('../models');

module.exports = {
    getAll: (req, res, next) => {
        return db.Cup.findAll({ order: [['id', 'ASC']] })
            .then((cups) => res.json(cups))
            .catch((err) => next(err));
    },

    create: (req, res, next) => {
        const { name } = req.body;

        if (name) {
            return db.Cup.nameIsUnique(name)
                .then((isUnique) => {
                    if (isUnique) {
                        return db.Cup.create({ name })
                            .then((cup) => res.json(cup))
                            .catch((err) => next(err));
                    }
                    throw {
                        status: 409,
                        message: 'Une coupe avec ce nom existe déjà',
                    };
                })
                .catch((err) => next(err));
        }
        throw { status: 406, message: 'Paramètres invalides' };
    },

    loadById: (req, res, next) => {
        return db.Cup.findByPk(req.params.cupId)
            .then((cup) => {
                if (cup) {
                    req.cup = cup;
                    return next();
                }
                throw { staus: 404, message: "Cette coupe n'existe pas" };
            })
            .catch((err) => next(err));
    },
};
