const _ = require('lodash');
const db = require('../models');
const { getPonce, isAuthenticated } = require('../utils');

_getRecord = (participations) => {
    const p = participations.slice(1);
    p.forEach((el) => (el.nbPoints = _.sumBy(el.Races, 'nbPoints')));
    return _.maxBy(p, 'nbPoints');
};

module.exports = {
    getPonceParticipations: (socket, onError) => {
        getPonce(onError, (ponce) => {
            ponce
                .getParticipations({
                    include: [{ model: db.Tournament }],
                    order: [
                        [db.Tournament, 'startDate', 'DESC'],
                        [db.Race, 'id', 'ASC'],
                    ],
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
                order: [
                    [db.Tournament, 'startDate', 'DESC'],
                    [db.Race, 'id', 'ASC'],
                ],
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

    getLastPonceParticipation: (socket, onError) => {
        getPonce(onError, (ponce) => {
            ponce
                .getParticipations({
                    include: [{ model: db.Tournament }],
                    order: [
                        [db.Tournament, 'startDate', 'DESC'],
                        [db.Race, 'id', 'ASC'],
                    ],
                })
                .then((participations) => {
                    if (participations.length > 0) {
                        socket.emit('getLastPonceParticipation', {
                            participation: participations[0],
                            record: _getRecord(participations),
                        });
                    } else {
                        onError("Ponce n'a participé à aucun tournoi");
                    }
                })
                .catch(() => onError('Une erreur est survenue'));
        });
    },
};
