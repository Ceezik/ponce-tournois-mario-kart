const streamers_chart_ctrl = require('../controllers/streamers_chart_ctrl');

module.exports = (io, socket, userId, isAdmin) => {
    socket.on('getStreamersChart', ({ tournament }, onError) => {
        streamers_chart_ctrl.getByTournament(socket, tournament, onError);
    });

    socket.on('addToStreamersChart', ({ tournament, username }, onError) => {
        if (isAdmin) {
            streamers_chart_ctrl.addToStreamersChart(
                io,
                socket,
                tournament,
                username,
                onError
            );
        } else {
            onError("Vous n'êtes pas autorisé à effectuer cette action");
        }
    });

    socket.on(
        'removeFromStreamersChart',
        ({ tournament, username }, onError) => {
            if (isAdmin) {
                streamers_chart_ctrl.removeFromStreamersChart(
                    io,
                    tournament,
                    username,
                    onError
                );
            } else {
                onError("Vous n'êtes pas autorisé à effectuer cette action");
            }
        }
    );
};
