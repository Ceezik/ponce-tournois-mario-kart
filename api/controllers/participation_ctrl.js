const _ = require('lodash');
const db = require('../models');
const { getPonce, getUser, canUserManage } = require('../utils');

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
                socket.emit(route, participations);
            } else {
                onError(errorMessage);
            }
        })
        .catch(() => onError('Une erreur est survenue'));
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
        getUser(onError, userId, (user) => {
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
        getUser(onError, userId, (user) => {
            _getLastParticipation(
                socket,
                onError,
                user,
                'getLastUserParticipation',
                "Vous n'avez participé à aucun tournoi"
            );
        });
    },

    getParticipations: (socket, onError, participationsInfos) => {
        const { usernames, tournamentsIds } = participationsInfos.reduce(
            (acc, curr) => {
                return {
                    usernames: [...acc.usernames, curr.username],
                    tournamentsIds: [...acc.tournamentsIds, curr.tournament],
                };
            },
            { usernames: [], tournamentsIds: [] }
        );

        db.Participation.findAll({
            include: [
                {
                    model: db.User,
                    where: { username: usernames },
                    attributes: ['id', 'username'],
                },
            ],
            where: { TournamentId: tournamentsIds },
        })
            .then((participations) =>
                socket.emit('getParticipations', participations)
            )
            .catch(() => onError('Une erreur est survenue'));
    },

    update: (
        io,
        socket,
        onError,
        { goal, nbPoints, participationId },
        userId
    ) => {
        db.Participation.findByPk(participationId)
            .then((participation) => {
                if (!participation) return onError('Une erreur est survenue');
                return canUserManage(userId, participation.UserId)
                    .then((canManage) => {
                        if (canManage) {
                            participation
                                .update({ goal, nbPoints })
                                .then((newParticipation) => {
                                    socket.emit('closeEditParticipationForm');
                                    io.emit(
                                        'editParticipation',
                                        newParticipation
                                    );
                                })
                                .catch(() =>
                                    onError('Une erreur est survenue')
                                );
                        } else {
                            onError(
                                "Vous n'êtes pas autorisé à effectuer cette action"
                            );
                        }
                    })
                    .catch(() => onError('Une erreur est survenue'));
            })
            .catch(() => onError('Une erreur est survenue'));
    },
};
