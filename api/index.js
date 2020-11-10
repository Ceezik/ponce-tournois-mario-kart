require('dotenv').config();

const express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io')(server),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    helmet = require('helmet'),
    PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cors({
        origin: [process.env.WEB_CLIENT_URL],
    })
);
app.use(helmet());

const errorHandler = (err, req, res, next) => {
    if (err.status === null || err.status === undefined) {
        res.status(500).send(err.message);
    } else {
        res.status(err.status).send(err.message);
    }
};

require('./passport');
require('./routes-api')(app);

io.on('connection', (socket) => {
    const { userId, isAdmin } = socket.handshake.query;
    require('./routes-socket')(
        io,
        socket,
        userId ? parseInt(userId) : null,
        isAdmin === 'true'
    );
});

app.use(errorHandler);

server.listen(PORT, () => {
    console.log('Application lancée sur le port ' + PORT);
});
