const podium_ctrl = require('../controllers/podium_ctrl');

module.exports = (io, socket, userId, isAdmin) => {
    socket.on('getPodium', (tournamentId, onError) => {
        podium_ctrl.getPodium(socket, onError, tournamentId);
    });

    socket.on('addPodium', (podium, onError) => {
        if (isAdmin) {
            podium_ctrl.create(io, socket, onError, podium);
        } else {
            onError("Vous n'êtes pas autorisé à effectuer cette action");
        }
    });

    socket.on('editPodium', (podium, onError) => {
        if (isAdmin) {
            podium_ctrl.update(io, socket, onError, podium);
        } else {
            onError("Vous n'êtes pas autorisé à effectuer cette action");
        }
    });
};
