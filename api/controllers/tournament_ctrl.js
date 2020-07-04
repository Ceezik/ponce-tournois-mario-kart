const db = require('../models');
const { paginate } = require('../utils');

const _getAll = (props) => {
    return db.Tournament.findAll({ order: [['startDate', 'DESC']], ...props });
};

module.exports = {
    getAll: (socket, page, pageSize, onError) => {
        _getAll(paginate(parseInt(page), parseInt(pageSize)))
            .then((tournaments) => socket.emit('getTournaments', tournaments))
            .catch(() => onError('Une erreur est survenue'));
    },

    create: (io, socket, onError, tournament) => {
        if (
            tournament &&
            tournament.name &&
            tournament.nbMaxRaces &&
            tournament.startDate &&
            tournament.endDate
        ) {
            if (tournament.endDate > tournament.startDate) {
                db.Tournament.nameIsUnique(tournament.name)
                    .then((isUnique) => {
                        if (isUnique) {
                            db.Tournament.create(tournament)
                                .then((t) => {
                                    socket.emit('createTournament', t);
                                    io.emit('refreshTournaments');
                                })
                                .catch(() =>
                                    onError('Une erreur est survenue')
                                );
                        } else {
                            onError('Un tournoi avec ce nom existe déjà');
                        }
                    })
                    .catch(() => onError('Une erreur est survenue'));
            } else {
                onError(
                    'La date de fin doit être ultérieure à la date de début'
                );
            }
        } else {
            onError('Paramètres invalides');
        }
    },
};
