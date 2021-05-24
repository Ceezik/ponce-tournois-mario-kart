const db = require('../models');
const { getPonce, getUser, canUserManage } = require('../utils');

const _getRaces = (user) => {
    return db.Race.findAll({
        include: [
            {
                model: db.Participation.scope('withoutRaces'),
                attributes: [],
                where: { UserId: user.id },
            },
            {
                model: db.Track,
                attributes: ['name', 'CupId'],
            },
        ],
    });
};

const canAccessParticipation = (participationId, userId, onError, cb) => {
    db.Participation.findByPk(participationId)
        .then((participation) => {
            if (!participation) {
                onError("Vous n'êtes pas autorisé à effectuer cette action");
            }
            canUserManage(userId, participation.UserId)
                .then((canManage) => {
                    if (canManage) cb();
                    else
                        onError(
                            "Vous n'êtes pas autorisé à effectuer cette action"
                        );
                })
                .catch(() => onError('Une erreur est survenue'));
        })
        .catch(() => onError('Une erreur est survenue'));
};

module.exports = {
    getPonceRaces: (socket, onError) => {
        getPonce(onError, (ponce) => {
            _getRaces(ponce)
                .then((races) => socket.emit('getPonceRaces', races))
                .catch(() => onError('Une erreur est survenue'));
        });
    },

    getUserRaces: (socket, onError, userId) => {
        getUser(onError, userId, (user) => {
            _getRaces(user)
                .then((races) => socket.emit('getUserRaces', races))
                .catch((err) => onError(err.message));
        });
    },

    addRace: (
        io,
        socket,
        onError,
        userId,
        { position, nbPoints, disconnected, trackId, participationId }
    ) => {
        canAccessParticipation(participationId, userId, onError, () => {
            db.Race.create({
                position,
                nbPoints,
                disconnected,
                TrackId: trackId,
                ParticipationId: participationId,
            })
                .then((race) => {
                    race.getTrack({ attributes: ['name'] })
                        .then((track) => {
                            race.setDataValue('Track', track);
                            socket.emit('closeAddRaceForm');
                            io.emit('addRace', race);
                        })
                        .catch(() => onError('Veuillez rafraichir la page'));
                })
                .catch(() => onError('Une erreur est survenue'));
        });
    },

    editRace: (
        io,
        socket,
        onError,
        userId,
        { position, nbPoints, disconnected, trackId, raceId }
    ) => {
        db.Race.findByPk(raceId)
            .then((race) => {
                if (race) {
                    canAccessParticipation(
                        race.ParticipationId,
                        userId,
                        onError,
                        () => {
                            race.update({
                                position,
                                nbPoints,
                                disconnected,
                                TrackId: trackId,
                            })
                                .then((newRace) => {
                                    newRace
                                        .getTrack({ attributes: ['name'] })
                                        .then((track) => {
                                            newRace.setDataValue(
                                                'Track',
                                                track
                                            );
                                            socket.emit('closeEditRaceForm');
                                            io.emit('editRace', newRace);
                                        })
                                        .catch(() =>
                                            onError(
                                                'Veuillez rafraichir la page'
                                            )
                                        );
                                })
                                .catch(() =>
                                    onError('Une erreur est survenue')
                                );
                        }
                    );
                } else {
                    onError('Une erreur est survenue');
                }
            })
            .catch(() => onError('Une erreur est survenue'));
    },

    deleteRace: (io, onError, userId, id) => {
        db.Race.findByPk(id)
            .then((race) => {
                if (race) {
                    canAccessParticipation(
                        race.ParticipationId,
                        userId,
                        onError,
                        () => {
                            race.destroy();
                            io.emit('deleteRace', race);
                        }
                    );
                } else {
                    onError("Cette course n'existe pas");
                }
            })
            .catch(() => onError('Une erreur est survenue'));
    },
};
