'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('participations', 'goal', {
            type: Sequelize.INTEGER,
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('participations', 'goal');
    },
};
