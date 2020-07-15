'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn('tracks', 'CupId', {
                type: Sequelize.INTEGER,
                references: {
                    model: 'cups',
                    key: 'id',
                },
                allowNull: false,
            }),
            queryInterface.addColumn('podia', 'TournamentId', {
                type: Sequelize.INTEGER,
                references: {
                    model: 'tournaments',
                    key: 'id',
                },
                allowNull: false,
            }),
            queryInterface.addColumn('participations', 'UserId', {
                type: Sequelize.INTEGER,
                references: {
                    model: 'users',
                    key: 'id',
                },
                allowNull: false,
            }),
            queryInterface.addColumn('participations', 'TournamentId', {
                type: Sequelize.INTEGER,
                references: {
                    model: 'tournaments',
                    key: 'id',
                },
                allowNull: false,
            }),
            queryInterface.addConstraint(
                'participations',
                ['UserId', 'TournamentId'],
                { type: 'unique', name: 'unique_participation' }
            ),
            queryInterface.addColumn('races', 'ParticipationId', {
                type: Sequelize.INTEGER,
                references: {
                    model: 'participations',
                    key: 'id',
                },
                allowNull: false,
            }),
            queryInterface.addColumn('races', 'TrackId', {
                type: Sequelize.INTEGER,
                references: {
                    model: 'tracks',
                    key: 'id',
                },
                allowNull: false,
            }),
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeColumn('tracks', 'CupId'),
            queryInterface.removeColumn('podia', 'TournamentId'),
            queryInterface.removeColumn('participations', 'UserId'),
            queryInterface.removeColumn('participations', 'TournamentId'),
            queryInterface.removeConstraint(
                'participations',
                'unique_participation'
            ),
            queryInterface.removeColumn('races', 'ParticipationId'),
            queryInterface.removeColumn('races', 'TrackId'),
        ]);
    },
};
