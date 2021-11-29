const db = require('../models');

const _getTournament = (tournamentId, onError, cb) => {
    db.Tournament.findByPk(tournamentId)
        .then((tournament) => {
            if (!tournament) onError("Ce tournoi n'existe pas");
            cb(tournament);
        })
        .catch(() => onError('Une erreur est survenue'));
};

const _getStreamer = (streamerUsername, onError, cb) => {
    db.User.findOne({ where: { username: streamerUsername } })
        .then((streamer) => {
            if (!streamer) onError("Cet utilisateur n'existe pas");
            cb(streamer);
        })
        .catch(() => onError('Une erreur est survenue'));
};

module.exports = {
    getByTournament: (socket, tournamentId, onError) => {
        _getTournament(tournamentId, onError, (tournament) => {
            return tournament
                .getStreamers({ attributes: ['id', 'username'] })
                .then((streamers) =>
                    socket.emit('getStreamersChart', streamers)
                )
                .catch(() => onError('Une erreur est survenue'));
        });
    },

    addToStreamersChart: (
        io,
        socket,
        tournamentId,
        streamerUsername,
        onError
    ) => {
        _getTournament(tournamentId, onError, (tournament) => {
            return _getStreamer(streamerUsername, onError, (streamer) => {
                return tournament
                    .hasStreamer(streamer.id)
                    .then((hasStreamer) => {
                        if (hasStreamer)
                            return onError(
                                'Ce streamer est déjà dans le graphique'
                            );
                        return tournament
                            .addStreamer(streamer.id)
                            .then((streamersChart) => {
                                socket.emit('closeAddToStreamersChartForm');
                                io.emit('addToStreamersChart', {
                                    StreamersChart: streamersChart,
                                    id: streamer.id,
                                    username: streamer.username,
                                });
                            })
                            .catch(() => onError('Une erreur est survenue'));
                    })
                    .catch(() => onError('Une erreur est survenue'));
            });
        });
    },

    removeFromStreamersChart: (io, tournamentId, streamerUsername, onError) => {
        _getTournament(tournamentId, onError, (tournament) => {
            return _getStreamer(streamerUsername, onError, (streamer) => {
                return tournament
                    .hasStreamer(streamer.id)
                    .then((hasStreamer) => {
                        if (!hasStreamer)
                            return onError(
                                "Ce streamer n'est pas dans le graphique"
                            );
                        return tournament
                            .removeStreamer(streamer.id)
                            .then(() =>
                                io.emit('removeFromStreamersChart', {
                                    id: streamer.id,
                                    username: streamer.username,
                                })
                            )
                            .catch(() => onError('Une erreur est survenue'));
                    })
                    .catch(() => onError('Une erreur est survenue'));
            });
        });
    },
};
