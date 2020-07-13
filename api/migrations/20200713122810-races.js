'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.createTable('races', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            position: {
                type: Sequelize.INTEGER,
                allowNull: false,
                validate: { min: 1, max: 12 },
            },
            nbPoints: {
                type: Sequelize.INTEGER,
                allowNull: false,
                validate: { min: 1, max: 15 },
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.dropTable('races');
    },
};
