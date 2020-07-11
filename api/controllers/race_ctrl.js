const db = require('../models');
const { getPonce } = require('../utils');

module.exports = {
    getPonceRaces: (socket, onError) => {
        getPonce(onError, (ponce) => {
            db.Race.findAll({
                include: [
                    {
                        model: db.Participation.scope('withoutRaces'),
                        attributes: [],
                        where: { UserId: ponce.id },
                    },
                    {
                        model: db.Track,
                        attributes: ['name', 'CupId'],
                    },
                ],
            })
                .then((races) => socket.emit('getPonceRaces', races))
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
};
