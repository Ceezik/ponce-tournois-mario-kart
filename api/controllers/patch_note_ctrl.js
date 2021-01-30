const db = require('../models');

module.exports = {
    getAll: (req, res, next) => {
        return db.PatchNote.findAll({
            order: [['createdAt', 'DESC']],
        })
            .then((patchNotes) => res.json(patchNotes))
            .catch((err) => next(err));
    },
};
