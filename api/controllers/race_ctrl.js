const db = require('../models');

module.exports = {
    addPonceRace: (
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
