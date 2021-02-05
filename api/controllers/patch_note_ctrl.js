const db = require('../models');

const _validate = (patchNote) => {
    if (patchNote.version && patchNote.content) {
        return db.PatchNote.versionIsUnique(patchNote.version, patchNote.id)
            .then((isUnique) => {
                if (isUnique) {
                    return Promise.resolve();
                }
                return Promise.reject({
                    status: 409,
                    message: 'Un patch note avec cette version existe déjà',
                });
            })
            .catch((err) => Promise.reject(err));
    }
    return Promise.reject({ status: 406, message: 'Paramètres invalides' });
};

module.exports = {
    getAll: (req, res, next) => {
        return db.PatchNote.findAll({
            order: [['createdAt', 'DESC']],
        })
            .then((patchNotes) => res.json(patchNotes))
            .catch((err) => next(err));
    },

    create: (req, res, next) => {
        return _validate(req.body)
            .then(() => {
                return db.PatchNote.create({ version, content })
                    .then((patchNote) => res.json(patchNote))
                    .catch((err) => next(err));
            })
            .catch((err) => next(err));
    },

    getLatest: (req, res, next) => {
        return db.PatchNote.findOne({
            order: [['createdAt', 'DESC']],
        })
            .then((patchNote) => res.json(patchNote))
            .catch((err) => next(err));
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

    updateById: (req, res, next) => {
        return _validate({ ...req.body, id: req.patchNote.id })
            .then(() => {
                return req.patchNote
                    .update(req.body)
                    .then((patchNote) => res.json(patchNote))
                    .catch((err) => next(err));
            })
            .catch((err) => next(err));
    },
};
