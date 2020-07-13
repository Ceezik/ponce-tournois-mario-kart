const fs = require('fs'),
    Sequelize = require('sequelize'),
    env = process.env.NODE_ENV || 'development',
    config = require(__dirname + '/../config/config')[env],
    db = {};
let sequelize;

if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        config
    );
}

sequelize
    .authenticate()
    .then(() => {
        console.log('Connecté à la base de données');
    })
    .catch((err) => {
        console.error('Impossible de se connecter : ', err);
    });

fs.readdirSync(__dirname)
    .filter((filename) => filename !== 'index.js')
    .forEach((filename) => {
        const model = sequelize.import('./' + filename);
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    try {
        db[modelName].associate(db);
    } catch (e) {}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
