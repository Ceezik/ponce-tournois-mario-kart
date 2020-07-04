const db = require('../models');

module.exports = {
    getByCup: (req, res, next) => {
        return req.cup
            .getTracks()
            .then((tracks) => res.json(tracks))
            .catch((err) => next(err));
    },

    create: (req, res, next) => {
        const { name } = req.body;

        if (name) {
            return db.Track.nameIsUnique(name)
                .then((isUnique) => {
                    if (isUnique) {
                        return req.cup
                            .createTrack({ name })
                            .then((track) => res.json(track))
                            .catch((err) => next(err));
                    }
                    throw {
                        status: 409,
                        message: 'Un circuit avec ce nom existe déjà',
                    };
                })
                .catch((err) => next(err));
        }
        throw { status: 406, message: 'Paramètres invalides' };
    },
};
