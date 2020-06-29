const fs = require('fs');

module.exports = (app) => {
    fs.readdirSync(__dirname)
        .filter((filename) => filename !== 'index.js')
        .forEach((filename) => {
            require('./' + filename).forEach((r) => {
                app[r.method](r.url, r.func);
            });
        });
};
