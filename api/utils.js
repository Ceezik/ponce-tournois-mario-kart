const db = require('./models');

module.exports = {
    paginate: (page = 0, pageSize = 25) => {
        const offset = page * pageSize;
        const limit = pageSize;

        return {
            offset,
            limit,
        };
    },

    getPonce: (onError, cb) => {
        const { PONCE_TWITCH_ID } = process.env;

        db.User.findOne({ where: { twitchId: PONCE_TWITCH_ID } })
            .then((user) => {
                if (user) {
                    cb(user);
                } else {
                    onError('Une erreur est survenue');
                }
            })
            .catch(() => onError('Une erreur est survenue'));
    },

    isAuthenticated: (onError, userId, cb) => {
        db.User.findByPk(userId)
            .then((user) => {
                if (user) {
                    cb(user);
                } else {
                    onError("Cet utilisateur n'existe pas");
                }
            })
            .catch(() => onError('Une erreur est survenue'));
    },
};
