const fs = require('fs');

module.exports = (io, socket) => {
    fs.readdirSync(__dirname)
        .filter((filename) => filename !== 'index.js')
        .forEach((filename) => {
            require('./' + filename)(io, socket);
        });
};
