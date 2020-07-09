const db = require('../models');
const { getPonce, isAuthenticated } = require('../utils');

module.exports = {
    getPonceParticipations: (socket, onError) => {
        getPonce(onError, (ponce) => {
            ponce
                .getParticipations({
                    include: [{ model: db.Tournament }],
                    order: [[db.Tournament, 'startDate', 'DESC']],
                })
                .then((participations) =>
                    socket.emit('getPonceParticipations', participations)
                )
                .catch((err) => onError(err.message));
        });
    },

    getUserParticipations: (socket, onError, userId) => {
        isAuthenticated(onError, userId, (user) => {
            user.getParticipations({
                include: [{ model: db.Tournament }],
                order: [[db.Tournament, 'startDate', 'DESC']],
            })
                .then((participations) =>
                    socket.emit('getUserParticipations', participations)
                )
                .catch(() => onError('Une erreur est survenue'));
        });
    },

    getPonceByTournament: (socket, onError, tournamentId) => {
        getPonce(onError, (ponce) => {
            db.Participation.findOne({
                where: { UserId: ponce.id, TournamentId: tournamentId },
            })
                .then((participation) => {
                    if (participation) {
                        socket.emit('getPonceParticipation', participation);
                    } else {
                        onError("Ponce n'a pas participé à ce tournoi");
                    }
                })
                .catch(() => onError('Une erreur est survenue'));
        });
    },
};
