const db = require('../models');

module.exports = {
    getPodium: (socket, onError, tournamentId) => {
        db.Podium.findAll({
            where: { TournamentId: tournamentId },
            order: [
                ['position', 'ASC'],
                ['player', 'ASC'],
            ],
        })
            .then((podiums) => socket.emit('getPodium', podiums))
            .catch(() => onError('Une erreur est survenue'));
    },

    create: (io, socket, onError, { position, player, tournamentId }) => {
        db.Podium.create({
            position,
            player,
            TournamentId: tournamentId,
        })
            .then((podium) => {
                socket.emit('closeAddPlayerForm');
                io.emit('addPodium', podium);
            })
            .catch(() => onError('Une erreur est survenue'));
    },

    update: (io, socket, onError, { position, player, id }) => {
        db.Podium.findByPk(id)
            .then((podium) => {
                if (podium) {
                    podium
                        .update({ position, player })
                        .then((newPodium) => {
                            socket.emit('closeEditPlayerForm');
                            io.emit('editPodium', newPodium);
                        })
                        .catch(() => onError('Une erreur est survenue'));
                } else {
                    onError('Une erreur est survenue');
                }
            })
            .catch(() => onError('Une erreur est survenue'));
    },
};
