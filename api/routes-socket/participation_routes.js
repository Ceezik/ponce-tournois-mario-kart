const participation_ctrl = require('../controllers/participation_ctrl');

module.exports = (io, socket, userId, isAdmin) => {
    socket.on('getPonceParticipations', (onError) => {
        participation_ctrl.getPonceParticipations(socket, onError);
    });

    socket.on('getUserParticipations', (user, onError) => {
        participation_ctrl.getUserParticipations(socket, onError, user);
    });

    socket.on('getPonceParticipation', (tournamentId, onError) => {
        participation_ctrl.getPonceByTournament(socket, onError, tournamentId);
    });

    socket.on('getLastPonceParticipation', (onError) => {
        participation_ctrl.getLastPonceParticipation(socket, onError);
    });

    socket.on('getLastUserParticipation', (user, onError) => {
        participation_ctrl.getLastUserParticipation(socket, onError, user);
    });

    socket.on('getParticipations', (participationsInfos, onError) => {
        participation_ctrl.getParticipations(
            socket,
            onError,
            participationsInfos
        );
    });

    socket.on('editParticipation', (participation, onError) => {
        participation_ctrl.update(io, socket, onError, participation, userId);
    });
};
