const fs = require('fs');

module.exports = (io, socket, userId, isAdmin) => {
    fs.readdirSync(__dirname)
        .filter((filename) => filename !== 'index.js')
        .forEach((filename) => {
            require('./' + filename)(io, socket, userId, isAdmin);
        });
};
