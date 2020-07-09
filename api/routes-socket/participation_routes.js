const participation_ctrl = require('../controllers/participation_ctrl');

module.exports = (io, socket, userId, isAdmin) => {
    socket.on('getPonceParticipations', (onError) => {
        participation_ctrl.getPonceParticipations(socket, onError);
    });

    socket.on('getUserParticipations', (onError) => {
        participation_ctrl.getUserParticipations(socket, onError, userId);
    });

    socket.on('getPonceParticipation', (tournamentId, onError) => {
        participation_ctrl.getPonceByTournament(socket, onError, tournamentId);
    });

    socket.on('getLastPonceParticipation', (onError) => {
        participation_ctrl.getLastPonceParticipation(socket, onError);
    });
};
