'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.createTable('participations', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.dropTable('participations');
    },
};
