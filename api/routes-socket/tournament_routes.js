const tournament_ctrl = require('../controllers/tournament_ctrl');

module.exports = (io, socket, userId, isAdmin) => {
    socket.on('getTournaments', ({ page, pageSize }, onError) => {
        tournament_ctrl.getAll(socket, page, pageSize, onError);
    });

    socket.on('createTournament', (tournament, onError) => {
        if (isAdmin) {
            tournament_ctrl.create(io, socket, onError, tournament);
        } else {
            onError("Vous n'êtes pas autorisé à effectuer cette action");
        }
    });
};
