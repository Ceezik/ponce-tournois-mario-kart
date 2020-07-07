const participation_ctrl = require('../controllers/participation_ctrl');

module.exports = (io, socket, userId, isAdmin) => {
    socket.on('getPonceParticipation', (tournamentId, onError) => {
        participation_ctrl.getPonceByTournament(socket, onError, tournamentId);
    });
};
