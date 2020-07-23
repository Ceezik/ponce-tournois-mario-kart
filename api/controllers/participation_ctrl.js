const _ = require('lodash');
const db = require('../models');
const { getPonce, isAuthenticated } = require('../utils');

_getLastParticipation = (socket, onError, user, route, errorMessage) => {
    user.getParticipations({
        include: [{ model: db.Tournament }],
        order: [
            [db.Tournament, 'startDate', 'DESC'],
            [db.Race, 'id', 'ASC'],
        ],
    })
        .then((participations) => {
            if (participations.length > 0) {
                socket.emit(route, {
                    participation: participations[0],
                    record: _getRecord(participations),
                });
            } else {
                onError(errorMessage);
            }
        })
        .catch(() => onError('Une erreur est survenue'));
};

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
                .catch(() => onError('Une erreur est survenue'));
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
            _getLastParticipation(
                socket,
                onError,
                ponce,
                'getLastPonceParticipation',
                "Ponce n'a participé à aucun tournoi"
            );
        });
    },

    getLastUserParticipation: (socket, onError, userId) => {
        isAuthenticated(onError, userId, (user) => {
            _getLastParticipation(
                socket,
                onError,
                user,
                'getLastUserParticipation',
                "Vous n'avez participé à aucun tournoi"
            );
        });
    },

    update: (
        io,
        socket,
        onError,
        { goal, participationId },
        userId,
        isAdmin
    ) => {
        db.Participation.findByPk(participationId)
            .then((participation) => {
                if (
                    participation &&
                    (participation.UserId === userId || isAdmin)
                ) {
                    participation
                        .update({ goal })
                        .then((newParticipation) => {
                            socket.emit('closeGoalForm');
                            io.emit('editParticipation', newParticipation);
                        })
                        .catch(() => onError('Une erreur est survenue'));
                } else {
                    onError(
                        "Vous n'êtes pas autorisé à effectuer cette action"
                    );
                }
            })
            .catch(() => onError('Une erreur est survenue'));
    },
};
