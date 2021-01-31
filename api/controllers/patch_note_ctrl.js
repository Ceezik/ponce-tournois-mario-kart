const db = require('../models');

module.exports = {
    getAll: (req, res, next) => {
        return db.PatchNote.findAll({
            order: [['createdAt', 'DESC']],
        })
            .then((patchNotes) => res.json(patchNotes))
            .catch((err) => next(err));
    },

    create: (req, res, next) => {
        const { version, content } = req.body;

        if (version && content) {
            return db.PatchNote.versionIsUnique(version)
                .then((isUnique) => {
                    if (isUnique) {
                        return db.PatchNote.create({ version, content })
                            .then((patchNote) => res.json(patchNote))
                            .catch((err) => next(err));
                    }
                    throw {
                        status: 409,
                        message: 'Un patch note avec cette version existe déjà',
                    };
                })
                .catch((err) => next(err));
        }
        throw { status: 406, message: 'Paramètres invalides' };
    },
};
