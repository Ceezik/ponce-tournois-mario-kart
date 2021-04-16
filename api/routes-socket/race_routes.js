const race_ctrl = require('../controllers/race_ctrl');

module.exports = (io, socket, userId, isAdmin) => {
    socket.on('getPonceRaces', (onError) => {
        race_ctrl.getPonceRaces(socket, onError);
    });

    socket.on('getUserRaces', (user, onError) => {
        race_ctrl.getUserRaces(socket, onError, user);
    });

    socket.on('addRace', (data, onError) => {
        race_ctrl.addRace(io, socket, onError, userId, isAdmin, data);
    });

    socket.on('editRace', (data, onError) => {
        race_ctrl.editRace(io, socket, onError, userId, isAdmin, data);
    });

    socket.on('deleteRace', (id, onError) => {
        race_ctrl.deleteRace(io, onError, userId, isAdmin, id);
    });
};
