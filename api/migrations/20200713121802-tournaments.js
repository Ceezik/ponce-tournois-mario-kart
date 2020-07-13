'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.createTable('tournaments', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
                validate: { len: [3, 50] },
            },
            nbParticipants: {
                type: Sequelize.INTEGER,
                validate: { min: 1 },
            },
            nbMaxRaces: {
                type: Sequelize.INTEGER,
                allowNull: false,
                validate: { min: 1 },
            },
            startDate: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            endDate: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.dropTable('tournaments');
    },
};
