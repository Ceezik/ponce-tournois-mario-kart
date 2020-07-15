'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.createTable('tracks', {
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
        });
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.dropTable('tracks');
    },
};
