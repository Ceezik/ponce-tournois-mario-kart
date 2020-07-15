'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.createTable('signuptokens', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                primaryKey: true,
            },
            twitchId: {
                type: Sequelize.STRING,
                allowNull: false,
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.dropTable('signuptokens');
    },
};
