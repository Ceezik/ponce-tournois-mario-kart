const { formatWebClientURLForCORS } = require('./utils');

require('dotenv').config();
const express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io')(server, {
        transports: ['websocket'],
    }),
    redisAdapter = require('socket.io-redis'),
    cors = require('cors'),
    helmet = require('helmet'),
    cluster = require('cluster');

const { NODE_ENV, PORT, REDIS_URL, WEB_CONCURRENCY } = process.env;

if (cluster.isMaster && NODE_ENV !== 'test') {
    const numWorkers = WEB_CONCURRENCY || 1;
    console.log(`Master cluster setting up ${numWorkers} workers....`);

    for (let i = 0; i < numWorkers; i += 1) {
        cluster.fork();
    }

    cluster.on(`online`, (worker) => {
        console.log(`Worker ${worker.process.pid} is online`);
    });

    cluster.on(`exit`, (worker) => {
        console.log(`Worker ${worker.process.pid} died `);
        cluster.fork();
    });
} else {
    io.adapter(redisAdapter(REDIS_URL));

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(
        cors({
            origin: formatWebClientURLForCORS(),
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
}
