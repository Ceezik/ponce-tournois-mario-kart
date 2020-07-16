module.exports = {
    development: {
        username: 'root',
        password: '',
        database: 'ponce-tournois-mario-kart',
        host: '127.0.0.1',
        port: 3306,
        dialect: 'mysql',
    },
    test: {
        username: 'root',
        password: '',
        database: 'ponce-tournois-mario-kart',
        host: '127.0.0.1',
        port: 3306,
        dialect: 'mysql',
    },
    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PWD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        logging: false,
    },
};
