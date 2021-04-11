const db = require('./models');

module.exports = {
    formatWebClientURLForCORS: () => {
        const { WEB_CLIENT_URL } = process.env;
        if (!WEB_CLIENT_URL) return [];

        try {
            const protocols = ['http://', 'https://'];
            const { host } = new URL(WEB_CLIENT_URL);
            return protocols.map((protocol) => `${protocol}${host}`);
        } catch (err) {
            return [WEB_CLIENT_URL];
        }
    },

    paginate: (page, pageSize) => {
        if (isNaN(page) || isNaN(pageSize)) return {};

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

    getUser: (onError, userId, cb) => {
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
