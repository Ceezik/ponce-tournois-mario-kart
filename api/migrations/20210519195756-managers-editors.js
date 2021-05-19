'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('managerseditors', {
            ManagerId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'users',
                    key: 'id',
                },
                allowNull: false,
                primaryKey: true,
            },
            EditorId: {
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
        return queryInterface.dropTable('managerseditors');
    },
};
