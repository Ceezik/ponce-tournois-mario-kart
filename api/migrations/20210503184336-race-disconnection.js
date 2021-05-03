'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('races', 'disconnected', {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn('races', 'disconnected');
    },
};
