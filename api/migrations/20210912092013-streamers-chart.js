'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('streamerscharts', {
            TournamentId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'tournaments',
                    key: 'id',
                },
                allowNull: false,
                primaryKey: true,
            },
            StreamerId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'users',
                    key: 'id',
                },
                allowNull: false,
                primaryKey: true,
            },
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('streamerscharts');
    },
};
