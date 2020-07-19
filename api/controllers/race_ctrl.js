const db = require('../models');
const { getPonce, isAuthenticated } = require('../utils');

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

module.exports = {
    getPonceRaces: (socket, onError) => {
        getPonce(onError, (ponce) => {
            _getRaces(ponce)
                .then((races) => socket.emit('getPonceRaces', races))
                .catch(() => onError('Une erreur est survenue'));
        });
    },

    getUserRaces: (socket, onError, userId) => {
        isAuthenticated(onError, userId, (user) => {
            _getRaces(user)
                .then((races) => socket.emit('getUserRaces', races))
                .catch((err) => onError(err.message));
        });
    },

    addRace: (
        io,
        socket,
        onError,
        { position, nbPoints, trackId, participationId }
    ) => {
        db.Race.create({
            position,
            nbPoints,
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
    },

    editRace: (
        io,
        socket,
        onError,
        { position, nbPoints, trackId, raceId }
    ) => {
        db.Race.findByPk(raceId)
            .then((race) => {
                if (race) {
                    race.update({
                        position,
                        nbPoints,
                        TrackId: trackId,
                    })
                        .then((newRace) => {
                            newRace
                                .getTrack({ attributes: ['name'] })
                                .then((track) => {
                                    newRace.setDataValue('Track', track);
                                    socket.emit('closeEditRaceForm');
                                    io.emit('editRace', newRace);
                                })
                                .catch(() =>
                                    onError('Veuillez rafraichir la page')
                                );
                        })
                        .catch(() => onError('Une erreur est survenue'));
                } else {
                    onError('Une erreur est survenue');
                }
            })
            .catch(() => onError('Une erreur est survenue'));
    },
};
