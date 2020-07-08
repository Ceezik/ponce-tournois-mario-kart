const race_ctrl = require('../controllers/race_ctrl');

module.exports = (io, socket, userId, isAdmin) => {
    socket.on('addPonceRace', (data, onError) => {
        if (isAdmin) {
            race_ctrl.addPonceRace(io, socket, onError, data);
        } else {
            onError("Vous n'êtes pas autorisé à effectuer cette action");
        }
    });
};
