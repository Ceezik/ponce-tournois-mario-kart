'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.createTable('users', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            username: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: false,
                validate: { len: [3, 50] },
            },
            twitchId: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: false,
            },
            isAdmin: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.dropTable('users');
    },
};
