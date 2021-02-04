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

    loadById: (req, res, next) => {
        return db.PatchNote.findByPk(req.params.patchNoteId)
            .then((patchNote) => {
                if (patchNote) {
                    req.patchNote = patchNote;
                    return next();
                }
                throw { staus: 404, message: "Ce patch note n'existe pas" };
            })
            .catch((err) => next(err));
    },

    getById: (req, res, next) => {
        return res.json(req.patchNote);
    },
};
