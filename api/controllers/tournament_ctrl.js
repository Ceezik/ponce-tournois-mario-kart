const db = require('../models');
const { paginate } = require('../utils');

const _getAll = (props) => {
    return db.Tournament.findAll({ order: [['startDate', 'DESC']], ...props });
};

const _validate = (tournament, onError, cb) => {
    if (
        tournament &&
        tournament.name &&
        tournament.nbMaxRaces &&
        tournament.startDate &&
        tournament.endDate
    ) {
        if (tournament.endDate > tournament.startDate) {
            db.Tournament.nameIsUnique(tournament.name, tournament.id)
                .then((isUnique) => {
                    if (isUnique) {
                        cb();
                    } else {
                        onError('Un tournoi avec ce nom existe déjà');
                    }
                })
                .catch(() => onError('Une erreur est survenue'));
        } else {
            onError('La date de fin doit être ultérieure à la date de début');
        }
    } else {
        onError('Paramètres invalides');
    }
};

const _getById = (id, onError, cb) => {
    db.Tournament.findByPk(id)
        .then((tournament) => {
            if (tournament) {
                cb(tournament);
            } else {
                onError("Ce tournoi n'existe pas");
            }
        })
        .catch(() => onError('Une erreur est survenue'));
};

module.exports = {
    getAll: (socket, page, pageSize, onError) => {
        _getAll(paginate(parseInt(page), parseInt(pageSize)))
            .then((tournaments) => socket.emit('getTournaments', tournaments))
            .catch(() => onError('Une erreur est survenue'));
    },

    create: (io, socket, onError, tournament) => {
        _validate(tournament, onError, () => {
            db.Tournament.create(tournament)
                .then((t) => {
                    socket.emit('createTournament', t);
                    io.emit('refreshTournaments');
                })
                .catch(() => onError('Une erreur est survenue'));
        });
    },

    updateById: (io, socket, onError, newTournament) => {
        _validate(newTournament, onError, () => {
            _getById(newTournament.id, onError, (tournament) => {
                tournament
                    .update(newTournament)
                    .then((t) => {
                        socket.emit('updateTournament', t);
                        io.emit('refreshTournament', t);
                        io.emit('refreshTournaments');
                    })
                    .catch(() => onError('Une erreur est survenue'));
            });
        });
    },
};
