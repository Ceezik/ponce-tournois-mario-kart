const db = require('../models');
const { getPonce } = require('../utils');

module.exports = {
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
