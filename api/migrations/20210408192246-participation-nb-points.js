'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('participations', 'nbPoints', {
            type: Sequelize.INTEGER,
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('participations', 'nbPoints');
    },
};
